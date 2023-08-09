import { Test, TestingModule } from '@nestjs/testing';
import { InvestorCService } from './investor-c.service';

describe('InvestorCService', () => {
  let service: InvestorCService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestorCService],
    }).compile();

    service = module.get<InvestorCService>(InvestorCService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
