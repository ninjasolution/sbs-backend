import { Test, TestingModule } from '@nestjs/testing';
import { BankinfoService } from './bankinfo.service';

describe('BankinfoService', () => {
  let service: BankinfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankinfoService],
    }).compile();

    service = module.get<BankinfoService>(BankinfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
