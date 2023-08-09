import { Test, TestingModule } from '@nestjs/testing';
import { InvestorBService } from './investor-b.service';

describe('InvestorBService', () => {
  let service: InvestorBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestorBService],
    }).compile();

    service = module.get<InvestorBService>(InvestorBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
