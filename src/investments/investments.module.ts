import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { Investment, InvestmentSchema } from './schema/investments.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Investment.name,
        schema: InvestmentSchema
      }
    ])
  ],
  controllers: [InvestmentsController],
  providers: [InvestmentsService]
})
export class InvestmentsModule {}
