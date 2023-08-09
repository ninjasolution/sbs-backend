import { Injectable } from '@nestjs/common';
import { CreateInvestorTypeDto } from './dto/create-investor-type.dto';
import { UpdateInvestorTypeDto } from './dto/update-investor-type.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestorType, InvestorTypeDocument } from './schema/investor-type.schema';

@Injectable()
export class InvestorTypeService {

  constructor(@InjectModel(InvestorType.name) private readonly InvestorTypeModel: Model<InvestorTypeDocument>) {}

  async create(createInvestorTypeDto: CreateInvestorTypeDto) {
    const investorType = new this.InvestorTypeModel(createInvestorTypeDto);
    return investorType.save();
  }

  async findAll(): Promise <InvestorTypeDocument[]> {
    return this.InvestorTypeModel.find().exec();
  }

  async findOne(id: number) {
    return this.InvestorTypeModel.findById(id);
  }

  async update(id: number, updateInvestorTypeDto: UpdateInvestorTypeDto) {
    return this.InvestorTypeModel.findByIdAndUpdate(id, updateInvestorTypeDto);
  }

  async remove(id: number) {
    return this.InvestorTypeModel.findByIdAndRemove(id);
  }
}
