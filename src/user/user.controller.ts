import { Roles } from './../auth/decorators/roles.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { Controller, Get, Post, Body, Param, UseGuards, Req, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { UserService } from './user.service';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { ChangeUserStepDto } from './dto/change-user-step.dto';
import { ChangeUserImagedDto } from './dto/change-user-image.dto';
import { ChangeUserRtimeDto } from './dto/change-user-rtime.dto';

import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
    ApiHeader,
    ApiOperation,
    ApiParam
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContactRequestDto } from './dto/contact-request.dto';

@ApiTags('User')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    // ╔═╗╦═╗╔═╗╔═╗╔╦╗╔═╗  ╦ ╦╔═╗╔═╗╦═╗
    // ║  ╠╦╝║╣ ╠═╣ ║ ║╣   ║ ║╚═╗║╣ ╠╦╝
    // ╚═╝╩╚═╚═╝╩ ╩ ╩ ╚═╝  ╚═╝╚═╝╚═╝╩╚═
    /**
     *
     * This method will create a user and it can be called by an admin user
     *
     * @param {CreateUserDto} - object with the user data
     * 
     * @returns {CreateUserDto} - This method will return an object with the user data
     *
     */
    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Register user', })
    @ApiOkResponse({})
    // @ApiCreatedResponse({})
    // @UseGuards(AuthGuard)
    // @Roles('admin')
    async register(@Body() createUserDto: CreateUserDto) {
        // console.log('^-^', createUserDto);
        return await this.userService.create(createUserDto);
    }

    // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
    // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
    // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝
    /**
     *
     * This method will log in an user with his credentials
     *
     * @param {LoginUserDto} - object with the user data
     * 
     * @returns {LoginUserDto } - This method will return an object with the user data
     *
     */
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login User', })
    @ApiOkResponse({})
    async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
        return await this.userService.login(req, loginUserDto);
    }

    /**
     *
     * This method will verify an admin user email
     *
     * @param {VerifyUuidDto} - object with the user data
     * 
     * @returns { name, email, accessToken, refreshToken } - This method will return an object with the user data
     *
     */
    // @Get('verify-email')
    // @HttpCode(HttpStatus.OK)
    // @ApiOperation({summary: 'Verify Email',})
    // @ApiOkResponse({})
    // // @UseGuards(AuthGuard)
    // // @Roles('admin')
    // async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
    //     console.log('^-^verify-email: ', verifyUuidDto);
    //     return await this.userService.verifyEmail(req, verifyUuidDto);
    // }

    // ╦  ╦╔═╗╦═╗╦╔═╗╦ ╦  ╔═╗╔╦╗╔═╗╦╦    ╔═╗╦ ╦╔═╗╔╦╗╔═╗╔╦╗╔═╗╦═╗
    // ╚╗╔╝║╣ ╠╦╝║╠╣ ╚╦╝  ║╣ ║║║╠═╣║║    ║  ║ ║╚═╗ ║ ║ ║║║║║╣ ╠╦╝
    //  ╚╝ ╚═╝╩╚═╩╚   ╩   ╚═╝╩ ╩╩ ╩╩╩═╝  ╚═╝╚═╝╚═╝ ╩ ╚═╝╩ ╩╚═╝╩╚═
    /**
     * This method will facilitate the verification process of a new user email address
     * 
     * @example - Request URL - GET - http://localhost:3000/customer/validation/PUTCODEHERE
     *
     * @param {string} - The verification code used to verify this email address.
     *
     */
    @Get('verify-email/:code')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verify User Email' })
    @ApiOkResponse({})
    @ApiParam({ name: 'code', description: 'code of User' })
    async verifyEmail(@Req() req: Request, @Param() params) {
        return await this.userService.verifyEmail(req, params.code);
    }

    @Get('request-email-verify')
    @UseGuards(AuthGuard)
    async verifyrequestEmail(@Req() req: Request) {
        return await this.userService.requestEmailVerify(req);
    }

    @Post('request-contact')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    async requestContact(@Body() contactRequestDto: ContactRequestDto) {
        return await this.userService.requestContact(contactRequestDto);
    }


    /**
     *
     * This method will get all user 
     *
     * @param {} - no parameter require
     * 
     * @returns {} - This method will return an object with all of the users data
     *
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.'
    })
    @ApiOperation({ summary: 'Get All Users', })
    @ApiOkResponse({})
    async getAllFeaturedListTypes() {
        return await this.userService.getAllUsers();
    }

    /**
     *
     * This method will get all user 
     *
     * @param {} - no parameter require
     * 
     * @returns {} - This method will return an object with all of the users data
     *but don't log out my original whatsapp account
     */
    @Get(':id')
    @ApiBearerAuth()
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.'
    })
    async getOneFeaturedListType(@Param() params) {
        return await this.userService.getOneUser(params.id);
    }

    /**
     *
     * This method will update the password for retailer or admin  users
     *
     * @param {name, email, verified} - 
     * 
     * @returns {
            name: user.name,
            email: user.email,
            verified: user.verified,
        } - This method will return an object with name, email and verified
     *
     */
    @Post('update-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Password User Reset', })
    @UseGuards(AuthGuard)
    @Roles('admin', 'retailer')
    @ApiBearerAuth()
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.'
    })
    @ApiOkResponse({})
    async updatePassword(@Req() req: Request, @Body() changeUserPasswordDto: ChangeUserPasswordDto) {
        return await this.userService.updatePassword(req, changeUserPasswordDto);
    }

    /**
     *
     * This method will update the password for retailer or admin  users
     *
     * @param {name, email, verified} - 
     * 
     * @returns {
            name: user.name,
            email: user.email,
            verified: user.verified,
        } - This method will return an object with name, email and verified
     *
     */
    @Post('update-step')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Step User Reset', })
    @UseGuards(AuthGuard)
    // @Roles('admin', 'retailer')
    @ApiBearerAuth()
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.'
    })
    @ApiOkResponse({})
    async updateStep(@Req() req: Request, @Body() changeUserStepDto: ChangeUserStepDto) {
        return await this.userService.updateStep(req, changeUserStepDto);
    }

    @Post('update-time')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Step User Reset', })
    @UseGuards(AuthGuard)
    // @Roles('admin', 'retailer')
    @ApiBearerAuth()
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.'
    })
    @ApiOkResponse({})
    async updateRtime(@Req() req: Request, @Body() changeUserRtimeDto: ChangeUserRtimeDto) {
        return await this.userService.updateRtime(req, changeUserRtimeDto);
    }

    /**
     *
     * This method will update an user image
     *
     * @param {ChangeUserImagedDto} - 
     * 
     * @returns {boolean}- This method will return true or false if the image was updated  
     *
     */
    @Put('update-image')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update User image', })
    @UseGuards(AuthGuard)
    @Roles('admin', 'retailer')
    @ApiBearerAuth()
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.'
    })
    @ApiOkResponse({})
    async updateUserImage(@Req() req: Request, @Body() changeUserImageDto: ChangeUserImagedDto) {
        return await this.userService.updateUserImage(req, changeUserImageDto);
    }

    /**
     *
     * This method will update an user
     *
     * @param {UpdateUserDto} - 
     * 
     * @returns {boolean}- This method will return true or false depending if the user was updated  
     *
     */
    @Put('update-user')
    @UseGuards(AuthGuard)
    @ApiOkResponse({})
    async updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(req, updateUserDto);
    }

    /**
     *
     * This method will update an user
     *
     * @param {UpdateUserDto} - 
     * 
     * @returns {boolean}- This method will return true or false depending if the user was updated  
     *
     */
    @Post('refresh-access-token')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Refresh Access Token with refresh token', })
    @ApiCreatedResponse({})
    async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
        return await this.userService.refreshAccessToken(refreshAccessTokenDto);
    }

    /**
     *
     * This method will update an user password
     *
     * @param {CreateForgotPasswordDto} - 
     * 
     * @returns {string}- This method will return the user email 
     *
     */
    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Forgot password', })
    @ApiOkResponse({})
    async forgotPassword(@Req() req: Request, @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
        return await this.userService.forgotPassword(req, createForgotPasswordDto);
    }

    /**
     *
     * This method will verify an user password
     *
     * @param {VerifyUuidDto} - 
     * 
     * @returns {string}- This method will return the user email 
     *
     */
    @Post('forgot-password-verify')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verfiy forget password code', })
    @ApiOkResponse({})
    async forgotPasswordVerify(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
        return await this.userService.forgotPasswordVerify(req, verifyUuidDto);
    }

    /**
     *
     * This method will verify an reset an user password
     *
     * @param {ResetPasswordDto} - 
     * 
     * @returns {string}- This method will return the user email 
     *
     */
    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Reset password after verify reset password', })
    // @ApiBearerAuth()
    // @ApiHeader({
    //     name: 'Bearer',
    //     description: 'the token we need for auth.'
    // })
    @ApiOkResponse({})
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return await this.userService.resetPassword(resetPasswordDto);
    }


    @Get('data')
    @UseGuards(AuthGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'A private route for check the auth', })
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.'
    })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    findAll() {
        return this.userService.findAll();
    }
}
