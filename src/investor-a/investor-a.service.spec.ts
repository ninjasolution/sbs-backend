import { Test, TestingModule } from '@nestjs/testing';
import { InvestorAService } from './investor-a.service';

describe('InvestorAService', () => {
  let service: InvestorAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestorAService],
    }).compile();

    service = module.get<InvestorAService>(InvestorAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
