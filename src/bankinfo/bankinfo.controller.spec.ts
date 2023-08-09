import { Test, TestingModule } from '@nestjs/testing';
import { BankinfoController } from './bankinfo.controller';
import { BankinfoService } from './bankinfo.service';

describe('BankinfoController', () => {
  let controller: BankinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankinfoController],
      providers: [BankinfoService],
    }).compile();

    controller = module.get<BankinfoController>(BankinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
