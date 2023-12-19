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
import { ForgotPassword } from './entities/forgot-password.entity';
import { User } from './entities/user.entity';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { ChangeUserStepDto } from './dto/change-user-step.dto';
import { ChangeUserRtimeDto } from './dto/change-user-rtime.dto';
import { ChangeUserImagedDto } from './dto/change-user-image.dto';
import { Token } from './entities/token.entity';
import crypto from "crypto"

@Injectable()
export class UserService {

    HOURS_TO_VERIFY = 168;
    HOURS_TO_BLOCK = 170;
    LOGIN_ATTEMPTS_TO_BLOCK = 10;

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('ForgotPassword') private readonly forgotPasswordModel: Model<ForgotPassword>,
        @InjectModel('Token') private readonly tokenModel: Model<Token>,
        private readonly authService: AuthService,
        public mailService: EmailService,
    ) { }

    // ┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐  ┬ ┬┌─┐┌─┐┬─┐
    // │  ├┬┘├┤ ├─┤ │ ├┤   │ │└─┐├┤ ├┬┘
    // └─┘┴└─└─┘┴ ┴ ┴ └─┘  └─┘└─┘└─┘┴└─
    async create(createUserDto: CreateUserDto) {
        try {
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
                message: 'Successfully Registeried!',
                status: 200,
                link: veirification
            }
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    // ┬  ┬┌─┐┬─┐┬┌─┐┬ ┬  ┌─┐┌┬┐┌─┐┬┬
    // └┐┌┘├┤ ├┬┘│├┤ └┬┘  ├┤ │││├─┤││
    //  └┘ └─┘┴└─┴└   ┴   └─┘┴ ┴┴ ┴┴┴─┘
    async verifyEmail(req: Request, token: string) {

        const _token = await this.tokenModel.findOneAndUpdate({ userId: req["user"]["id"], token: token, type: "Email", status: false }, { $set: { status: true } });
        if (!_token) {
            throw new NotFoundException('Not found token.');
        }

        const user = await this.userModel.findOneAndUpdate({ _id: req["user"]["id"] }, { $set: { verified: true } }, { new: true })
        return this.buildUserInfo(user);
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
        var date = new Date(),
            date2 = new Date(date);
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
            verification: user.verification,
            verified: user.verified,
            time: user.rtime,
            exp: expiration_time,
            accessToken: await this.authService.createAccessToken(user._id, user.email),
            refreshToken: await this.authService.createRefreshToken(req, user._id),
        }
        return resData;
    }

    async requestEmailVerify(req: Request) {
        const user = await this.findUserByEmail(req["user"]["email"])
        const token = new this.tokenModel({
            userId: user.id,
            type: "Email",
            token: crypto.randomBytes(32).toString("hex"),
            status: false
        });
        await token.save();

        let data = {
            user: user,
            message: 'Successfully Registeried!',
            status: 200,
            link: token.token
        }
        // const status = await this.mailService.verifyAccount(data).then((result) => {
        //     return result;
        // });
        return this.buildRegistrationInfo(data, true);
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
            accessToken: await this.authService.createAccessToken(user._id, user.email),
        };
    }

    // ┌─┐┌─┐┬─┐┌─┐┌─┐┌┬┐  ┌─┐┌─┐┌─┐┌─┐┬ ┬┌─┐┬─┐┌┬┐
    // ├┤ │ │├┬┘│ ┬│ │ │   ├─┘├─┤└─┐└─┐││││ │├┬┘ ││
    // └  └─┘┴└─└─┘└─┘ ┴   ┴  ┴ ┴└─┘└─┘└┴┘└─┘┴└──┴┘
    async forgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto) {
        
        const forgotpassword = await this.saveForgotPassword(req, createForgotPasswordDto);
        const data = {
            recovery: {
                email: forgotpassword.email,
                code: forgotpassword.verification
            }
        }
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

        return this.buildUserInfo(user);

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
    async updateUser(req: Request, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userModel.findById(req["user"]["id"]);
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
        user.postal = updateUserDto.postal;

        const newUser = await this.userModel.findOneAndUpdate({ _id: user._id }, {$set: user}, { new: true });

        return this.buildUserInfo(newUser);
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

    private buildUserInfo(user): any {
        const userPasswordUpdatingInfo = {
            displayname: user.displayname,
            email: user.email,
            roles: user.roles,
            firstname: user.firstname,
            surname: user.surname,
            id: user._id,
            postal: user.postal,
            step: user.step,
            verification: user.verification,
            verified: user.verified,
            time: user.rtime,
        };
        return userPasswordUpdatingInfo;
    }


    private async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('Wrong email or password.');
        }
        return user;
    }



    private async checkPassword(attemptPass: string, user) {
        const match = await bcrypt.compare(attemptPass, user.password);
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

    private async saveForgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto): Promise<ForgotPassword> {
        const forgotPassword = await this.forgotPasswordModel.create({
            email: createForgotPasswordDto.email,
            verification: v4(),
            expires: addHours(new Date(), this.HOURS_TO_VERIFY),
            ip: this.authService.getIp(req),
            browser: this.authService.getBrowserInfo(req),
            country: this.authService.getCountry(req),
        });
        return await forgotPassword.save();
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
