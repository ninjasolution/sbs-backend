import { Module } from '@nestjs/common';
import { ContactdetailsService } from './contactdetails.service';
import { ContactdetailsController } from './contactdetails.controller';

import { Contactdetail, ContactdetailSchema } from './schema/contactdetails.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Contactdetail.name,
        schema: ContactdetailSchema
      }
    ])
  ],
  controllers: [ContactdetailsController],
  providers: [ContactdetailsService]
})
export class ContactdetailsModule {}
