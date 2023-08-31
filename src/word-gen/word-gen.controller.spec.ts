import { Test, TestingModule } from '@nestjs/testing';
import { WordGenController } from './word-gen.controller';
import { WordGenService } from './word-gen.service';

describe('WordGenController', () => {
  let controller: WordGenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordGenController],
      providers: [WordGenService],
    }).compile();

    controller = module.get<WordGenController>(WordGenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
