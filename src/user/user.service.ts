import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request } from 'express';
import { AuthService } from './../auth/auth.service';
import { EmailService } from './../services/mail.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { v4 } from 'uuid';
import { addHours } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { ForgotPassword } from './interfaces/forgot-password.interface';
import { User } from './interfaces/user.interface';
import { time } from 'console';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { ChangeUserStepDto } from './dto/change-user-step.dto';
import { ChangeUserRtimeDto } from './dto/change-user-rtime.dto';
import { ChangeUserImagedDto } from './dto/change-user-image.dto';

@Injectable()
export class UserService {

    HOURS_TO_VERIFY = 168;
    HOURS_TO_BLOCK = 170;
    LOGIN_ATTEMPTS_TO_BLOCK = 10;

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('ForgotPassword') private readonly forgotPasswordModel: Model<ForgotPassword>,
        private readonly authService: AuthService,
        public mailService: EmailService,
    ) { }

    // ┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐  ┬ ┬┌─┐┌─┐┬─┐
    // │  ├┬┘├┤ ├─┤ │ ├┤   │ │└─┐├┤ ├┬┘
    // └─┘┴└─└─┘┴ ┴ ┴ └─┘  └─┘└─┘└─┘┴└─
    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            // console.log('^-^', createUserDto);
            const user = new this.userModel(createUserDto);
            if (!user.displayname) {
                user.displayname = user.email;
            }

            await this.isEmailUnique(user.email);
            await this.isDisplayNameUnique(user.displayname);
            this.setRegistrationInfo(user);
            user.roles = ["customer"];
            user.verified = false;
            var veirification = user.verification;
            user.loginAttempts = 0;
            await user.save();
            let data = {
                user: user,
                link: veirification
            }
            // console.log('^-^', data);
            const status = await this.mailService.verifyAccount(data).then((result) => {
                return result;
            });
            return this.buildRegistrationInfo(data, status);
        } catch (error) {
            console.error(error);
        }
    }

    // ┬  ┬┌─┐┬─┐┬┌─┐┬ ┬  ┌─┐┌┬┐┌─┐┬┬
    // └┐┌┘├┤ ├┬┘│├┤ └┬┘  ├┤ │││├─┤││
    //  └┘ └─┘┴└─┴└   ┴   └─┘┴ ┴┴ ┴┴┴─┘
    async verifyEmail(req: Request, verifyUuidDto: VerifyUuidDto) {
        const user = await this.findByVerification(verifyUuidDto.verification);
        await this.setUserAsVerified(user);
        return {
            name: user.displayname,
            email: user.email,
            accessToken: await this.authService.createAccessToken(user._id),
            refreshToken: await this.authService.createRefreshToken(req, user._id),
        };
    }

    // ┬  ┌─┐┌─┐┬┌┐┌
    // │  │ ││ ┬││││
    // ┴─┘└─┘└─┘┴┘└┘
    async login(req: Request, loginUserDto: LoginUserDto) {
        const user = await this.findUserByEmail(loginUserDto.email);
        if (!user.displayname) {
            user.displayname = user.email;
        }
        this.isUserBlocked(user);
        await this.checkPassword(loginUserDto.password, user);
        await this.passwordsAreMatch(user);
        // this.isRoleBlocked(user);
        var date = new Date(),
            date2 = new Date(date);
        console.log('^-^CreatedTime : ', date);
        date2.setMinutes(date.getMinutes() + parseInt(process.env.JWT_EXPIRATION_MINUTES));
        var expiration_time = date2;
        var resData = {
            displayname: user.displayname,
            email: user.email,
            roles: user.roles,
            firstname: user.firstname,
            surname: user.surname,
            id: user._id,
            step: user.step,
            time: user.rtime,
            exp: expiration_time,
            accessToken: await this.authService.createAccessToken(user._id),
            refreshToken: await this.authService.createRefreshToken(req, user._id),
        }
        // console.log('^-^', resData);

        return resData;
    }

    // ┬─┐┌─┐┌─┐┬─┐┌─┐┌─┐┬ ┬  ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐  ┌┬┐┌─┐┬┌─┌─┐┌┐┌
    // ├┬┘├┤ ├┤ ├┬┘├┤ └─┐├─┤  ├─┤│  │  ├┤ └─┐└─┐   │ │ │├┴┐├┤ │││
    // ┴└─└─┘└  ┴└─└─┘└─┘┴ ┴  ┴ ┴└─┘└─┘└─┘└─┘└─┘   ┴ └─┘┴ ┴└─┘┘└┘
    async refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto) {
        const userId = await this.authService.findRefreshToken(refreshAccessTokenDto.refreshToken);
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new BadRequestException('Bad request');
        }
        return {
            accessToken: await this.authService.createAccessToken(user._id),
        };
    }

    // ┌─┐┌─┐┬─┐┌─┐┌─┐┌┬┐  ┌─┐┌─┐┌─┐┌─┐┬ ┬┌─┐┬─┐┌┬┐
    // ├┤ │ │├┬┘│ ┬│ │ │   ├─┘├─┤└─┐└─┐││││ │├┬┘ ││
    // └  └─┘┴└─└─┘└─┘ ┴   ┴  ┴ ┴└─┘└─┘└┴┘└─┘┴└──┴┘
    async forgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto) {
        await this.findByEmail(createForgotPasswordDto.email);
        await this.saveForgotPassword(req, createForgotPasswordDto);
        const forgotpassword = await this.findVerificationCodeByEmail(createForgotPasswordDto);
        const data = {
            recovery : {
                email: forgotpassword.email,
                code: forgotpassword.verification
            }
        }
        // console.log('^-^ Forgot Password Saved. ', data);
        const status = await this.mailService.recoveryPassword(data).then((result) => {
            return result;
        });
        return {
            email: createForgotPasswordDto.email,
            message: status,
        };
    }

    // ┌─┐┌─┐┬─┐┌─┐┌─┐┌┬┐  ┌─┐┌─┐┌─┐┌─┐┬ ┬┌─┐┬─┐┌┬┐  ┬  ┬┌─┐┬─┐┬┌─┐┬ ┬
    // ├┤ │ │├┬┘│ ┬│ │ │   ├─┘├─┤└─┐└─┐││││ │├┬┘ ││  └┐┌┘├┤ ├┬┘│├┤ └┬┘
    // └  └─┘┴└─└─┘└─┘ ┴   ┴  ┴ ┴└─┘└─┘└┴┘└─┘┴└──┴┘   └┘ └─┘┴└─┴└   ┴
    async forgotPasswordVerify(req: Request, verifyUuidDto: VerifyUuidDto) {
        const forgotPassword = await this.findForgotPasswordByUuid(verifyUuidDto);
        await this.setForgotPasswordFirstUsed(req, forgotPassword);
        return {
            email: forgotPassword.email,
            message: 'now reset your password.',
        };
    }

    // ┬─┐┌─┐┌─┐┌─┐┌┬┐  ┌─┐┌─┐┌─┐┌─┐┬ ┬┌─┐┬─┐┌┬┐
    // ├┬┘├┤ └─┐├┤  │   ├─┘├─┤└─┐└─┐││││ │├┬┘ ││
    // ┴└─└─┘└─┘└─┘ ┴   ┴  ┴ ┴└─┘└─┘└┴┘└─┘┴└──┴┘
    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const forgotPassword = await this.findForgotPasswordByEmail(resetPasswordDto);
        await this.setForgotPasswordFinalUsed(forgotPassword);
        await this.resetUserPassword(resetPasswordDto);
        return {
            email: resetPasswordDto.email,
            message: 'password successfully changed.',
        };
    }

    // GET ALL USERS
    async getAllUsers(): Promise<any> {
        return await this.userModel.find({});
    }

    // GET ONE USER
    async getOneUser(id: string): Promise<User> {
        const userid = new Types.ObjectId(id);
        return await this.userModel.findById(userid);
    }

    //UPDATE RETAILER PASSWORD
    async updatePassword(req: Request, changeUserPasswordDto: ChangeUserPasswordDto) {

        const user = await this.findUserByEmail(changeUserPasswordDto.email);

        this.isUserBlocked(user);
        await this.checkPassword(changeUserPasswordDto.password, user);
        await this.passwordsAreMatch(user);
        const new_password_hashed = await bcrypt.hash(changeUserPasswordDto.newPassword, 10);
        user.password = new_password_hashed;

        await this.userModel.updateOne({ email: changeUserPasswordDto.email }, user);

        return this.buildUpdatingPasswordInfo(user);

    }

    //UPDATE User Step
    async updateStep(req: Request, changeUserStepDto: ChangeUserStepDto) {

        const user = await this.findUserByEmail(changeUserStepDto.email);
        console.log('^-^Change Step :', changeUserStepDto);
        this.isUserBlocked(user);
        user.step = changeUserStepDto.step;

        return await this.userModel.updateOne({ email: changeUserStepDto.email }, user);
    }

    //UPDATE User Step
    async updateRtime(req: Request, changeUserrtimeDto: ChangeUserRtimeDto) {

        const user = await this.findUserByEmail(changeUserrtimeDto.email);
        console.log('^-^Change Rtime :', changeUserrtimeDto);
        this.isUserBlocked(user);
        user.rtime = changeUserrtimeDto.rtime;

        return await this.userModel.updateOne({ email: changeUserrtimeDto.email }, user);
    }

    //UPDATE USER IMAGE
    async updateUserImage(req: Request, changeUserImageDto: ChangeUserImagedDto) {

        const user = await this.findUserByEmail(changeUserImageDto.email);

        this.isUserBlocked(user);

        await this.userModel.updateOne({ email: changeUserImageDto.email }, user);

        return { update: true };

    }

    //UPDATE USER
    async updateUser(req: Request, updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findById(updateUserDto.userId);
        // console.log('^-^updateUserDto : ', updateUserDto);
        if (updateUserDto.password != undefined) {
            const new_password_hashed = await bcrypt.hash(updateUserDto.password, 10);
            user.password = new_password_hashed;
        }
        if (updateUserDto.email != user.email) {
            await this.isEmailUnique(updateUserDto.email);
            user.email = updateUserDto.email;
        }
        if (updateUserDto.displayname != user.displayname) {
            await this.isDisplayNameUnique(updateUserDto.displayname);
            user.displayname = updateUserDto.displayname;
        }

        user.firstname = updateUserDto.firstname;
        user.surname = updateUserDto.surname;
        user.phone = updateUserDto.phone;
        console.log('^-^Updated User: ', user);


        await this.userModel.updateOne({ _id: updateUserDto.userId }, user);

        return { update: true };

    }
    // ┌─┐┬─┐   ┌┬┐┌─┐┌─┐┌┬┐┌─┐┌┬┐  ┌─┐┌─┐┬─┐┬  ┬┬┌─┐┌─┐
    // ├─┘├┬┘    │ ├┤ │   │ ├┤  ││  └─┐├┤ ├┬┘└┐┌┘││  ├┤
    // ┴  ┴└─    ┴ └─┘└─┘ ┴ └─┘─┴┘  └─┘└─┘┴└─ └┘ ┴└─┘└─┘
    findAll(): any {
        return { hello: 'world' };
    }

    // ********************************************
    // ╔═╗╦═╗╦╦  ╦╔═╗╔╦╗╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    // ╠═╝╠╦╝║╚╗╔╝╠═╣ ║ ║╣   ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    // ╩  ╩╚═╩ ╚╝ ╩ ╩ ╩ ╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
    // ********************************************

    private async isEmailUnique(email: string) {
        const user = await this.userModel.findOne({ email: email });
        if (user) {
            throw new BadRequestException('Email must be unique.');
        }
    }

    private setRegistrationInfo(user): any {
        user.verification = v4();
        user.verificationExpires = addHours(new Date(), this.HOURS_TO_VERIFY);
        // console.log('^-^ userRegistrationInfo: ', user);
    }

    private buildRegistrationInfo(data, email_status): any {
        const userRegistrationInfo = {
            name: data.user.displayname,
            email: data.user.email,
            verified: false,
            email_status: email_status,
            link: data.link,
            result: "success"
        };
        return userRegistrationInfo;
    }

    private buildUpdatingPasswordInfo(user): any {
        const userPasswordUpdatingInfo = {
            name: user.name,
            email: user.email,
            verified: user.verified,
        };
        return userPasswordUpdatingInfo;
    }

    private async findByVerification(verification: string): Promise<User> {
        const user = await this.userModel.findOne({ verification, verified: false, verificationExpires: { $gt: new Date() } });
        if (!user) {
            throw new BadRequestException('Bad request.');
        }
        return user;
    }

    private async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email, verified: true });
        if (!user) {
            throw new NotFoundException('Email not found.');
        }
        return user;
    }

    private async setUserAsVerified(user) {
        user.verified = true;
        await user.save();
    }

    private async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email, verified: true });
        if (!user) {
            throw new NotFoundException('Wrong email or password.');
        }
        return user;
    }
    
    // ┬  ┬┌─┐┬─┐┬┌─┐┬ ┬  ┌─┐┬ ┬┌─┐┌┬┐┌─┐┌┬┐┌─┐┬─┐  ┌─┐┌┬┐┌─┐┬┬  
    // └┐┌┘├┤ ├┬┘│├┤ └┬┘  │  │ │└─┐ │ │ ││││├┤ ├┬┘  ├┤ │││├─┤││  
    //  └┘ └─┘┴└─┴└   ┴   └─┘└─┘└─┘ ┴ └─┘┴ ┴└─┘┴└─  └─┘┴ ┴┴ ┴┴┴─┘
    async verifyCustomerEmail(code: string) {

        const user = await this.findByVerification(code);
        await this.setUserAsVerified(user);
        return {
            name: user.displayname,
            email: user.email,
            verify: user.verified
        };
    }

    
    private async checkPassword(attemptPass: string, user) {
        const match = await bcrypt.compare(attemptPass, user.password);
        // console.log('^-^Compare Pass: ', attemptPass, user.password, match);
        if (!match) {
            await this.passwordsDoNotMatch(user);
            throw new NotFoundException('Wrong email or password.');
        }
        return match;
    }

    private isUserBlocked(user) {
        if (user.blockExpires > Date.now()) {
            throw new ConflictException('User has been blocked try later.');
        }
    }

    private isRoleBlocked(user) {
        if (user.roles.some(role => role === 'customer')) {
            throw new ConflictException('Wrong User or Email!.');
        }
    }

    private async passwordsDoNotMatch(user) {
        user.loginAttempts += 1;
        await user.save();
        if (user.loginAttempts >= this.LOGIN_ATTEMPTS_TO_BLOCK) {
            await this.blockUser(user);
            throw new ConflictException('User blocked.');
        }
    }

    private async blockUser(user) {
        user.blockExpires = addHours(new Date(), this.HOURS_TO_BLOCK);
        await user.save();
    }

    private async passwordsAreMatch(user) {
        user.loginAttempts = 0;
        await user.save();
    }

    private async saveForgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto) {
        const forgotPassword = await this.forgotPasswordModel.create({
            email: createForgotPasswordDto.email,
            verification: v4(),
            expires: addHours(new Date(), this.HOURS_TO_VERIFY),
            ip: this.authService.getIp(req),
            browser: this.authService.getBrowserInfo(req),
            country: this.authService.getCountry(req),
        });
        await forgotPassword.save();
    }

    private async findForgotPasswordByUuid(verifyUuidDto: VerifyUuidDto): Promise<ForgotPassword> {
        const forgotPassword = await this.forgotPasswordModel.findOne({
            verification: verifyUuidDto.verification,
            firstUsed: false,
            finalUsed: false,
            expires: { $gt: new Date() },
        });
        if (!forgotPassword) {
            throw new BadRequestException('Bad request.');
        }
        return forgotPassword;
    }

    private async setForgotPasswordFirstUsed(req: Request, forgotPassword: ForgotPassword) {
        forgotPassword.firstUsed = true;
        forgotPassword.ipChanged = this.authService.getIp(req);
        forgotPassword.browserChanged = this.authService.getBrowserInfo(req);
        forgotPassword.countryChanged = this.authService.getCountry(req);
        await forgotPassword.save();
    }

    private async findVerificationCodeByEmail(forgotPasswordDto: CreateForgotPasswordDto): Promise<ForgotPassword> {
        const forgotPassword = await this.forgotPasswordModel.findOne({
            email: forgotPasswordDto.email,
            firstUsed: false,
            finalUsed: false,
            expires: { $gt: new Date() },
        });
        if (!forgotPassword) {
            throw new BadRequestException('Bad request.');
        }
        return forgotPassword;
    }

    private async findForgotPasswordByEmail(resetPasswordDto: ResetPasswordDto): Promise<ForgotPassword> {
        // console.log('^-^resetPassword : ', resetPasswordDto);
        const forgotPassword = await this.forgotPasswordModel.findOne({
            email: resetPasswordDto.email,
            firstUsed: true,
            finalUsed: false,
            expires: { $gt: new Date() },
        });
        // console.log('^-^ForgotPassword record : ', forgotPassword);
        if (!forgotPassword) {
            throw new BadRequestException('Bad request.');
        }
        return forgotPassword;
    }

    private async setForgotPasswordFinalUsed(forgotPassword: ForgotPassword) {
        forgotPassword.finalUsed = true;
        await forgotPassword.save();
    }

    private async resetUserPassword(resetPasswordDto: ResetPasswordDto) {
        const user = await this.userModel.findOne({
            email: resetPasswordDto.email,
            verified: true,
        });
        user.password = resetPasswordDto.password;
        await user.save();
    }

    private async isDisplayNameUnique(displayname: string) {
        const user = await this.userModel.findOne({ displayname: displayname });
        if (user) {
            throw new BadRequestException('Display Name must be unique.');
        }
    }
}
