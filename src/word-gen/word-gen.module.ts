import { Module } from '@nestjs/common';
import { WordGenService } from './word-gen.service';
import { WordGenController } from './word-gen.controller';

@Module({
  controllers: [WordGenController],
  providers: [WordGenService]
})
export class WordGenModule {}
