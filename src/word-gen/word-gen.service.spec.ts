import { Test, TestingModule } from '@nestjs/testing';
import { WordGenService } from './word-gen.service';

describe('WordGenService', () => {
  let service: WordGenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordGenService],
    }).compile();

    service = module.get<WordGenService>(WordGenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
