import { Test, TestingModule } from '@nestjs/testing';
import { InvestorEService } from './investor-e.service';

describe('InvestorEService', () => {
  let service: InvestorEService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestorEService],
    }).compile();

    service = module.get<InvestorEService>(InvestorEService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
