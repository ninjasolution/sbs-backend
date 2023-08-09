import { Module } from '@nestjs/common';
import { InvestorDService } from './investor-d.service';
import { InvestorDController } from './investor-d.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { InvestorD, InvestorDSchema } from './schema/investor-d.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InvestorD.name,
        schema: InvestorDSchema
      }
    ])
  ],
  controllers: [InvestorDController],
  providers: [InvestorDService]
})
export class InvestorDModule {}
