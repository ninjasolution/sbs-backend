import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/SBSau'),
    UsersModule,
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
    WholesaleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
