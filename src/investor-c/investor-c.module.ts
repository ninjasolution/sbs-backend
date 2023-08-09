import { Module } from '@nestjs/common';
import { InvestorCService } from './investor-c.service';
import { InvestorCController } from './investor-c.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { InvestorC, InvestorCSchema } from './schema/investor-c.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InvestorC.name,
        schema: InvestorCSchema
      }
    ])
  ],
  controllers: [InvestorCController],
  providers: [InvestorCService]
})
export class InvestorCModule {}
