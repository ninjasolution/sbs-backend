import { Injectable } from '@nestjs/common';
import { CreateInvestorCDto } from './dto/create-investor-c.dto';
import { UpdateInvestorCDto } from './dto/update-investor-c.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestorC, InvestorCDocument } from './schema/investor-c.schema';

@Injectable()
export class InvestorCService {

  constructor(@InjectModel(InvestorC.name) private readonly InvestorCModel: Model<InvestorCDocument>) {}  
  
  async create(createInvestorCDto: CreateInvestorCDto) {
    const investorC = new this.InvestorCModel(createInvestorCDto);
    return investorC.save();
  }

  async findAll(): Promise <InvestorCDocument[]> {
    return this.InvestorCModel.find().exec();
  }

  async findOne(id: string) {
    return this.InvestorCModel.findOne({userId: id});
  }

  async update(id: string, updateInvestorCDto: UpdateInvestorCDto) {
    return this.InvestorCModel.findByIdAndUpdate(id, updateInvestorCDto);
  }

  async remove(id: number) {
    return this.InvestorCModel.findByIdAndRemove(id);
  }
}
