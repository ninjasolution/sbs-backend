import { Module } from '@nestjs/common';
import { FatcaService } from './fatca.service';
import { FatcaController } from './fatca.controller';

@Module({
  controllers: [FatcaController],
  providers: [FatcaService]
})
export class FatcaModule {}
