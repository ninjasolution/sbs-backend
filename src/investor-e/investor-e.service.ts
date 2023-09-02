import { Injectable } from '@nestjs/common';
import { CreateInvestorEDto } from './dto/create-investor-e.dto';
import { UpdateInvestorEDto } from './dto/update-investor-e.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InvestorE, InvestorEDocument } from './schema/investor-e.schema';

@Injectable()
export class InvestorEService {

  constructor(@InjectModel(InvestorE.name) private readonly InvestorEModel: Model<InvestorEDocument>) {}

  async create(createInvestorEDto: CreateInvestorEDto) {
    const investorE = new this.InvestorEModel(createInvestorEDto);
    investorE.userId = new Types.ObjectId(createInvestorEDto.userId);
    return investorE.save();
  }

  async findAll(): Promise <InvestorEDocument[]> {
    return this.InvestorEModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.InvestorEModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async update(id: string, updateInvestorEDto: UpdateInvestorEDto) {
    updateInvestorEDto.userId = new Types.ObjectId(updateInvestorEDto.userId);
    return this.InvestorEModel.findByIdAndUpdate(id, updateInvestorEDto);
  }

  async remove(id: number) {
    return this.InvestorEModel.findByIdAndRemove(id);
  }
}
