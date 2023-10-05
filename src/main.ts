import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { warn } from 'console';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { getRawBodyOnRequest } from './get-raw-body-on-request'
import * as dotenv from 'dotenv';

import { ContactdetailsModule } from './contactdetails/contactdetails.module';
import { InvestmentsModule } from './investments/investments.module';
import { InvestorAModule } from './investor-a/investor-a.module';
import { InvestorBModule } from './investor-b/investor-b.module';
import { InvestorCModule } from './investor-c/investor-c.module';
import { InvestorDModule } from './investor-d/investor-d.module';
import { InvestorEModule } from './investor-e/investor-e.module';
import { InvestorTypesModule } from './investor-types/investor-types.module';
import { BankinfoModule } from './bankinfo/bankinfo.module';
import { DeposittypeModule } from './deposittype/deposittype.module';
import { AdviserModule } from './adviser/adviser.module';
import { VerificationModule } from './verification/verification.module';
import { FatcaModule } from './fatca/fatca.module';
import { WholesaleModule } from './wholesale/wholesale.module';
import { DeclarationModule } from './declaration/declaration.module';
import { UserModule } from './user/user.module';
dotenv.config({ path: '.env'});

async function bootstrap() {
  // Load the environment variables from .env file
  const app = await NestFactory.create(AppModule);

  app.use(getRawBodyOnRequest);

  // ╦ ╦╔═╗╔═╗  ╔═╗╦  ╔═╗╔╗ ╔═╗╦    ╔═╗╦╔═╗╔═╗╔═╗
  // ║ ║╚═╗║╣   ║ ╦║  ║ ║╠╩╗╠═╣║    ╠═╝║╠═╝║╣ ╚═╗
  // ╚═╝╚═╝╚═╝  ╚═╝╩═╝╚═╝╚═╝╩ ╩╩═╝  ╩  ╩╩  ╚═╝╚═╝
  app.useGlobalPipes(new ValidationPipe({
    
    // disableErrorMessages: true,
  }));

  // ╔═╗╦ ╦╔═╗╔═╗╔═╗╔═╗╦═╗
  // ╚═╗║║║╠═╣║ ╦║ ╦║╣ ╠╦╝
  // ╚═╝╚╩╝╩ ╩╚═╝╚═╝╚═╝╩╚═
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [
      ContactdetailsModule,
      InvestmentsModule,
      InvestorAModule,
      InvestorBModule,
      InvestorCModule,
      InvestorDModule,
      InvestorEModule,
      InvestorTypesModule,
      BankinfoModule,
      DeposittypeModule,
      AdviserModule,
      VerificationModule,
      FatcaModule,
      WholesaleModule,
      DeclarationModule,
      UserModule
      ],
  });
  SwaggerModule.setup('api', app, document);


  // app.enableCors({
  //   origin: 'https://sbs-form-frontend.vercel.app',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });

  app.enableCors(); 
  // ╔╦╗╔═╗╔═╗╦╔╗╔╔═╗  ╔═╗╔╗╔╔╦╗  ╦  ╦╔═╗╔╦╗╔═╗╔╗╔  ╔╦╗╔═╗  ╔═╗╔═╗╦═╗╔╦╗
  // ║║║╣ ╠╣ ║║║║║╣    ╠═╣║║║ ║║  ║  ║╚═╗ ║ ║╣ ║║║   ║ ║ ║  ╠═╝║ ║╠╦╝ ║
  // ═╩╝╚═╝╚  ╩╝╚╝╚═╝  ╩ ╩╝╚╝═╩╝  ╩═╝╩╚═╝ ╩ ╚═╝╝╚╝   ╩ ╚═╝  ╩  ╚═╝╩╚═ ╩
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  warn(`APP IS LISTENING TO PORT ${PORT}`);
}
bootstrap();
