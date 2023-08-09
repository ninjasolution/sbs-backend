import { Module } from '@nestjs/common';
import { InvestorAService } from './investor-a.service';
import { InvestorAController } from './investor-a.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { InvestorA, InvestorASchema } from './schema/investor-a.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InvestorA.name,
        schema: InvestorASchema
      }
    ])
  ],
  controllers: [InvestorAController],
  providers: [InvestorAService]
})
export class InvestorAModule {}
