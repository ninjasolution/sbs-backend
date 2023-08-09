import { Module } from '@nestjs/common';
import { AdviserService } from './adviser.service';
import { AdviserController } from './adviser.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Adviser, AdviserSchema } from './schema/adviser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Adviser.name,
        schema: AdviserSchema
      }
    ])
  ],
  controllers: [AdviserController],
  providers: [AdviserService]
})
export class AdviserModule {}
