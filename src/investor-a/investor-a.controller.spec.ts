import { Test, TestingModule } from '@nestjs/testing';
import { InvestorAController } from './investor-a.controller';
import { InvestorAService } from './investor-a.service';

describe('InvestorAController', () => {
  let controller: InvestorAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorAController],
      providers: [InvestorAService],
    }).compile();

    controller = module.get<InvestorAController>(InvestorAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
