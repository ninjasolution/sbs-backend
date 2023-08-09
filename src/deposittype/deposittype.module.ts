import { Module } from '@nestjs/common';
import { DeposittypeService } from './deposittype.service';
import { DeposittypeController } from './deposittype.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Deposittype, DeposittypeSchema } from './schema/deposittype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Deposittype.name,
        schema: DeposittypeSchema
      }
    ])
  ],
  controllers: [DeposittypeController],
  providers: [DeposittypeService]
})
export class DeposittypeModule {}
