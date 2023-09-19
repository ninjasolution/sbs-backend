import { Module } from '@nestjs/common';
import { WordGenService } from './word-gen.service';
import { WordGenController } from './word-gen.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WordGen } from './entities/word-gen.entity';
import { WordGenSchema } from './schema/word-gen.schema';
import { EmailService } from './../services/mail.service';
import { ContactdetailsService } from 'src/contactdetails/contactdetails.service';
import { Contactdetail } from 'src/contactdetails/entities/contactdetail.entity';
import { ContactdetailSchema } from 'src/contactdetails/schema/contactdetails.schema';
import { Investment, InvestmentSchema } from 'src/investments/schema/investments.schema';
import { InvestmentsService } from 'src/investments/investments.service';
import { InvestorType, InvestorTypeSchema } from 'src/investor-types/schema/investor-type.schema';
import { InvestorTypeService } from 'src/investor-types/investor-types.service';
import { InvestorA, InvestorASchema } from 'src/investor-a/schema/investor-a.schema';
import { InvestorB } from 'src/investor-b/entities/investor-b.entity';
import { InvestorC } from 'src/investor-c/entities/investor-c.entity';
import { InvestorD } from 'src/investor-d/entities/investor-d.entity';
import { InvestorE } from 'src/investor-e/entities/investor-e.entity';
import { InvestorBSchema } from 'src/investor-b/schema/investor-b.schema';
import { InvestorCSchema } from 'src/investor-c/schema/investor-c.schema';
import { InvestorDSchema } from 'src/investor-d/schema/investor-d.schema';
import { InvestorESchema } from 'src/investor-e/schema/investor-e.schema';
import { Bankinfo, BankinfoSchema } from 'src/bankinfo/schema/bankinfo.schema';
import { Deposittype, DeposittypeSchema } from 'src/deposittype/schema/deposittype.schema';
import { Adviser, AdviserSchema } from 'src/adviser/schema/adviser.schema';
import { Verification, VerificationSchema } from 'src/verification/schema/verification.schema';
import { Fatca, FatcaSchema } from 'src/fatca/schema/fatca.schema';
import { Wholesale, WholesaleSchema } from 'src/wholesale/schema/wholesale.schema';
import { Declaration, DeclarationSchema } from 'src/declaration/schema/declaration.schema';
import { InvestorAService } from 'src/investor-a/investor-a.service';
import { InvestorBService } from 'src/investor-b/investor-b.service';
import { InvestorCService } from 'src/investor-c/investor-c.service';
import { InvestorDService } from 'src/investor-d/investor-d.service';
import { InvestorEService } from 'src/investor-e/investor-e.service';
import { BankinfoService } from 'src/bankinfo/bankinfo.service';
import { DeposittypeService } from 'src/deposittype/deposittype.service';
import { AdviserService } from 'src/adviser/adviser.service';
import { VerificationService } from 'src/verification/verification.service';
import { FatcaService } from 'src/fatca/fatca.service';
import { WholesaleService } from 'src/wholesale/wholesale.service';
import { DeclarationService } from 'src/declaration/declaration.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: WordGen.name, schema: WordGenSchema }]),
    MongooseModule.forFeature([{ name: Contactdetail.name, schema: ContactdetailSchema }]),
    MongooseModule.forFeature([{ name: Investment.name, schema: InvestmentSchema}]),
    MongooseModule.forFeature([{ name: InvestorType.name, schema: InvestorTypeSchema}]),
    MongooseModule.forFeature([{ name: InvestorA.name, schema: InvestorASchema}]),
    MongooseModule.forFeature([{ name: InvestorB.name, schema: InvestorBSchema}]),
    MongooseModule.forFeature([{ name: InvestorC.name, schema: InvestorCSchema}]),
    MongooseModule.forFeature([{ name: InvestorD.name, schema: InvestorDSchema}]),
    MongooseModule.forFeature([{ name: InvestorE.name, schema: InvestorESchema}]),
    MongooseModule.forFeature([{ name: Bankinfo.name, schema: BankinfoSchema}]),
    MongooseModule.forFeature([{ name: Deposittype.name, schema: DeposittypeSchema}]),
    MongooseModule.forFeature([{ name: Adviser.name, schema: AdviserSchema}]),
    MongooseModule.forFeature([{ name: Verification.name, schema: VerificationSchema}]),
    MongooseModule.forFeature([{ name: Fatca.name, schema: FatcaSchema}]),
    MongooseModule.forFeature([{ name: Wholesale.name, schema: WholesaleSchema}]),
    MongooseModule.forFeature([{ name: Declaration.name, schema: DeclarationSchema}]),

  ],
  controllers: [WordGenController],
  providers: [WordGenService, ContactdetailsService, InvestmentsService, InvestorTypeService, InvestorAService, InvestorBService, InvestorCService, InvestorDService, InvestorEService, BankinfoService, DeposittypeService, AdviserService, VerificationService, FatcaService, WholesaleService, DeclarationService, EmailService]
})
export class WordGenModule {}
