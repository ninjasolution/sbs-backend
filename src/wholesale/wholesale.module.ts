import { Module } from '@nestjs/common';
import { WholesaleService } from './wholesale.service';
import { WholesaleController } from './wholesale.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Wholesale, WholesaleSchema } from './schema/wholesale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wholesale.name,
        schema: WholesaleSchema
      }
    ])
  ],
  controllers: [WholesaleController],
  providers: [WholesaleService]
})
export class WholesaleModule {}
