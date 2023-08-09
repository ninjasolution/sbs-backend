import { Test, TestingModule } from '@nestjs/testing';
import { DeposittypeController } from './deposittype.controller';
import { DeposittypeService } from './deposittype.service';

describe('DeposittypeController', () => {
  let controller: DeposittypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeposittypeController],
      providers: [DeposittypeService],
    }).compile();

    controller = module.get<DeposittypeController>(DeposittypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
