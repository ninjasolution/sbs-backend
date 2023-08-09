import { Module } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { DeclarationController } from './declaration.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Declaration, DeclarationSchema } from './schema/declaration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Declaration.name,
        schema: DeclarationSchema
      }
    ])
  ],
  controllers: [DeclarationController],
  providers: [DeclarationService]
})
export class DeclarationModule {}
