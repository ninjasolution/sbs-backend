import { Test, TestingModule } from '@nestjs/testing';
import { FatcaService } from './fatca.service';

describe('FatcaService', () => {
  let service: FatcaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FatcaService],
    }).compile();

    service = module.get<FatcaService>(FatcaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
