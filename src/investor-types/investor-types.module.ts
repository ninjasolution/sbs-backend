import { Module } from '@nestjs/common';
import { InvestorTypeService } from './investor-types.service';
import { InvestorTypesController } from './investor-types.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { InvestorType, InvestorTypeSchema } from './schema/investor-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InvestorType.name,
        schema: InvestorTypeSchema
      }
    ])
  ],
  controllers: [InvestorTypesController],
  providers: [InvestorTypeService]
})
export class InvestorTypesModule {}
