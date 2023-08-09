import { Module } from '@nestjs/common';
import { BankinfoService } from './bankinfo.service';
import { BankinfoController } from './bankinfo.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Bankinfo, BankinfoSchema } from './schema/bankinfo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bankinfo.name,
        schema: BankinfoSchema
      }
    ])
  ],
  controllers: [BankinfoController],
  providers: [BankinfoService]
})
export class BankinfoModule {}
