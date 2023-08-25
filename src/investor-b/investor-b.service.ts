import { Injectable } from '@nestjs/common';
import { CreateInvestorBDto } from './dto/create-investor-b.dto';
import { UpdateInvestorBDto } from './dto/update-investor-b.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestorB, InvestorBDocument } from './schema/investor-b.schema';

@Injectable()
export class InvestorBService {

  constructor(@InjectModel(InvestorB.name) private readonly InvestorBModel: Model<InvestorBDocument>) {}

  async create(createInvestorBDto: CreateInvestorBDto) {
    const investorB = new this.InvestorBModel(createInvestorBDto);
    return investorB.save();
  }

  async findAll(): Promise <InvestorBDocument[]> {
    return this.InvestorBModel.find().exec();
  }

  async findOne(id: string) {
    return this.InvestorBModel.findOne({userId: id});
  }

  async update(id: string, updateInvestorBDto: UpdateInvestorBDto) {
    return this.InvestorBModel.findByIdAndUpdate(id, updateInvestorBDto);
  }

  async remove(id: number) {
    return this.InvestorBModel.findByIdAndRemove(id);
  }
}
