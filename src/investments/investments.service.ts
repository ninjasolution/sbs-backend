import { Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Investment, InvestmentDocument } from './schema/investments.schema';

@Injectable()
export class InvestmentsService {

  constructor(@InjectModel(Investment.name) private readonly InvestmentModel: Model <InvestmentDocument>) {}

  async create(createInvestmentDto: CreateInvestmentDto) {
    const investment = new this.InvestmentModel(createInvestmentDto);
    investment.userId = new Types.ObjectId(createInvestmentDto.userId);
    return investment.save();
  }

  async findAll(): Promise <InvestmentDocument[]> {
    return this.InvestmentModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.InvestmentModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async update(id: string, updateInvestmentDto: UpdateInvestmentDto) {
    updateInvestmentDto.userId = new Types.ObjectId(updateInvestmentDto.userId);
    return this.InvestmentModel.findByIdAndUpdate(id, updateInvestmentDto);
  }

  async remove(id: number) {
    return this.InvestmentModel.findByIdAndRemove(id);
  }
}
