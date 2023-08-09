import { Test, TestingModule } from '@nestjs/testing';
import { DeposittypeService } from './deposittype.service';

describe('DeposittypeService', () => {
  let service: DeposittypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeposittypeService],
    }).compile();

    service = module.get<DeposittypeService>(DeposittypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
