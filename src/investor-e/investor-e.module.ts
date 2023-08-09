import { Module } from '@nestjs/common';
import { InvestorEService } from './investor-e.service';
import { InvestorEController } from './investor-e.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { InvestorE, InvestorESchema } from './schema/investor-e.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InvestorE.name,
        schema: InvestorESchema
      }
    ])
  ],
  controllers: [InvestorEController],
  providers: [InvestorEService]
})
export class InvestorEModule {}
