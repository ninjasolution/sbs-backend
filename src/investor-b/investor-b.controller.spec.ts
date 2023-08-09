import { Test, TestingModule } from '@nestjs/testing';
import { InvestorBController } from './investor-b.controller';
import { InvestorBService } from './investor-b.service';

describe('InvestorBController', () => {
  let controller: InvestorBController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorBController],
      providers: [InvestorBService],
    }).compile();

    controller = module.get<InvestorBController>(InvestorBController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
