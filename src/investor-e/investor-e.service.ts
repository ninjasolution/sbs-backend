import { Injectable } from '@nestjs/common';
import { CreateInvestorEDto } from './dto/create-investor-e.dto';
import { UpdateInvestorEDto } from './dto/update-investor-e.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestorE, InvestorEDocument } from './schema/investor-e.schema';

@Injectable()
export class InvestorEService {

  constructor(@InjectModel(InvestorE.name) private readonly InvestorEModel: Model<InvestorEDocument>) {}

  async create(createInvestorEDto: CreateInvestorEDto) {
    const investorE = new this.InvestorEModel(createInvestorEDto);
    return investorE.save();
  }

  async findAll(): Promise <InvestorEDocument[]> {
    return this.InvestorEModel.find().exec();
  }

  async findOne(id: string) {
    return this.InvestorEModel.findOne({userId: id});
  }

  async update(id: string, updateInvestorEDto: UpdateInvestorEDto) {
    return this.InvestorEModel.findByIdAndUpdate(id, updateInvestorEDto);
  }

  async remove(id: number) {
    return this.InvestorEModel.findByIdAndRemove(id);
  }
}
