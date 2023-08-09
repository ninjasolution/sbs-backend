import { Injectable } from '@nestjs/common';
import { CreateInvestorDDto } from './dto/create-investor-d.dto';
import { UpdateInvestorDDto } from './dto/update-investor-d.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestorD, InvestorDDocument } from './schema/investor-d.schema';

@Injectable()
export class InvestorDService {

  constructor(@InjectModel(InvestorD.name) private readonly InvestorDModel: Model<InvestorDDocument>) {}

  async create(createInvestorDDto: CreateInvestorDDto) {
    const investorD = new this.InvestorDModel(createInvestorDDto);
    return investorD.save();
  }

  async findAll(): Promise <InvestorDDocument[]> {
    return this.InvestorDModel.find().exec();
  }

  async findOne(id: number) {
    return this.InvestorDModel.findById(id);
  }

  async update(id: number, updateInvestorDDto: UpdateInvestorDDto) {
    return this.InvestorDModel.findByIdAndUpdate(id, updateInvestorDDto);
  }

  async remove(id: number) {
    return this.InvestorDModel.findByIdAndRemove(id);
  }
}
