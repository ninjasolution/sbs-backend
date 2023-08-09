import { Test, TestingModule } from '@nestjs/testing';
import { InvestorDController } from './investor-d.controller';
import { InvestorDService } from './investor-d.service';

describe('InvestorDController', () => {
  let controller: InvestorDController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorDController],
      providers: [InvestorDService],
    }).compile();

    controller = module.get<InvestorDController>(InvestorDController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
