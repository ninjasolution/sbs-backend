import { Module } from '@nestjs/common';
import { FatcaService } from './fatca.service';
import { FatcaController } from './fatca.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Fatca, FatcaSchema } from './schema/fatca.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Fatca.name,
        schema: FatcaSchema
      }
    ])
  ],
  controllers: [FatcaController],
  providers: [FatcaService]
})
export class FatcaModule {}
