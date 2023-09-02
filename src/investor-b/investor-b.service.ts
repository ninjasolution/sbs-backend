import { Injectable } from '@nestjs/common';
import { CreateInvestorBDto } from './dto/create-investor-b.dto';
import { UpdateInvestorBDto } from './dto/update-investor-b.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InvestorB, InvestorBDocument } from './schema/investor-b.schema';

@Injectable()
export class InvestorBService {

  constructor(@InjectModel(InvestorB.name) private readonly InvestorBModel: Model<InvestorBDocument>) {}

  async create(createInvestorBDto: CreateInvestorBDto) {
    const investorB = new this.InvestorBModel(createInvestorBDto);
    investorB.userId = new Types.ObjectId(createInvestorBDto.userId);    return investorB.save();
  }

  async findAll(): Promise <InvestorBDocument[]> {
    return this.InvestorBModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.InvestorBModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async update(id: string, updateInvestorBDto: UpdateInvestorBDto) {
    updateInvestorBDto.userId = new Types.ObjectId(updateInvestorBDto.userId);
    return this.InvestorBModel.findByIdAndUpdate(id, updateInvestorBDto);
  }

  async remove(id: number) {
    return this.InvestorBModel.findByIdAndRemove(id);
  }
}
