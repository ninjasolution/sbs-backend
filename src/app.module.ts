import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

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
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WordGenModule } from './word-gen/word-gen.module';

require('dotenv').config();
console.log('^-^', process.env.MONGO_URI);
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
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
    AuthModule,
    UserModule,
    WordGenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
