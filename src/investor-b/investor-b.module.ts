import { Module } from '@nestjs/common';
import { InvestorBService } from './investor-b.service';
import { InvestorBController } from './investor-b.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { InvestorB, InvestorBSchema } from './schema/investor-b.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InvestorB.name,
        schema: InvestorBSchema
      }
    ])
  ],
  controllers: [InvestorBController],
  providers: [InvestorBService]
})
export class InvestorBModule {}
