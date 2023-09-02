import { Injectable } from '@nestjs/common';
import { CreateInvestorTypeDto } from './dto/create-investor-type.dto';
import { UpdateInvestorTypeDto } from './dto/update-investor-type.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InvestorType, InvestorTypeDocument } from './schema/investor-type.schema';

@Injectable()
export class InvestorTypeService {

  constructor(@InjectModel(InvestorType.name) private readonly InvestorTypeModel: Model<InvestorTypeDocument>) {}

  async create(createInvestorTypeDto: CreateInvestorTypeDto) {
    const investorType = new this.InvestorTypeModel(createInvestorTypeDto);
    investorType.userId = new Types.ObjectId(createInvestorTypeDto.userId);
    console.log('^-^InvestorType : ', investorType);
    return investorType.save();
  }

  async findAll(): Promise <InvestorTypeDocument[]> {
    return this.InvestorTypeModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.InvestorTypeModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async update(id: string, updateInvestorTypeDto: UpdateInvestorTypeDto) {
    updateInvestorTypeDto.userId = new Types.ObjectId(updateInvestorTypeDto.userId);
    return this.InvestorTypeModel.findByIdAndUpdate(id, updateInvestorTypeDto);
  }

  async remove(id: number) {
    return this.InvestorTypeModel.findByIdAndRemove(id);
  }
}
