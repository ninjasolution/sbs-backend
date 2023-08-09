import { Test, TestingModule } from '@nestjs/testing';
import { InvestorDService } from './investor-d.service';

describe('InvestorDService', () => {
  let service: InvestorDService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestorDService],
    }).compile();

    service = module.get<InvestorDService>(InvestorDService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
