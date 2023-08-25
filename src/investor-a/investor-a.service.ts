import { Injectable } from '@nestjs/common';
import { CreateInvestorADto } from './dto/create-investor-a.dto';
import { UpdateInvestorADto } from './dto/update-investor-a.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestorA, InvestorADocument } from './schema/investor-a.schema';

@Injectable()
export class InvestorAService {

  constructor(@InjectModel(InvestorA.name) private readonly InvestorAModel: Model<InvestorADocument>) {}

  async create(createInvestorADto: CreateInvestorADto) {
    const investorA = new this.InvestorAModel(createInvestorADto);
    return investorA.save();
  }

  async findAll(): Promise <InvestorADocument[]> {
    return this.InvestorAModel.find().exec();
  }

  async findOne(id: string) {
    return this.InvestorAModel.findOne({userId: id});
  }

  async update(id: string, updateInvestorADto: UpdateInvestorADto) {
    return this.InvestorAModel.findByIdAndUpdate(id, updateInvestorADto);
  }

  async remove(id: number) {
    return this.InvestorAModel.findByIdAndRemove(id);
  }
}
