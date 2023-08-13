import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MailService } from './../services/mail.service';
import { AuthModule } from 'src/auth/auth.module';
import { ForgotPasswordSchema } from './schemas/forgot-password.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'ForgotPassword', schema: ForgotPasswordSchema}]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, MailService],
})
export class UserModule {}
