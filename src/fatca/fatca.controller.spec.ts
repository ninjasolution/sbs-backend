import { Test, TestingModule } from '@nestjs/testing';
import { FatcaController } from './fatca.controller';
import { FatcaService } from './fatca.service';

describe('FatcaController', () => {
  let controller: FatcaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FatcaController],
      providers: [FatcaService],
    }).compile();

    controller = module.get<FatcaController>(FatcaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
