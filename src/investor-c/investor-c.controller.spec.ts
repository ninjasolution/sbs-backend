import { Test, TestingModule } from '@nestjs/testing';
import { InvestorCController } from './investor-c.controller';
import { InvestorCService } from './investor-c.service';

describe('InvestorCController', () => {
  let controller: InvestorCController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorCController],
      providers: [InvestorCService],
    }).compile();

    controller = module.get<InvestorCController>(InvestorCController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
