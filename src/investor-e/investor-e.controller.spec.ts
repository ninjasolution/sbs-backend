import { Test, TestingModule } from '@nestjs/testing';
import { InvestorEController } from './investor-e.controller';
import { InvestorEService } from './investor-e.service';

describe('InvestorEController', () => {
  let controller: InvestorEController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorEController],
      providers: [InvestorEService],
    }).compile();

    controller = module.get<InvestorEController>(InvestorEController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
