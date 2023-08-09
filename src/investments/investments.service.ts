import { Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Investment, InvestmentDocument } from './schema/investments.schema';

@Injectable()
export class InvestmentsService {

  constructor(@InjectModel(Investment.name) private readonly InvestmentModel: Model <InvestmentDocument>) {}

  async create(createInvestmentDto: CreateInvestmentDto) {
    const investment = new this.InvestmentModel(createInvestmentDto);
    return investment.save();
  }

  async findAll(): Promise <InvestmentDocument[]> {
    return this.InvestmentModel.find().exec();
  }

  async findOne(id: number) {
    return this.InvestmentModel.findById(id);
  }

  async update(id: number, updateInvestmentDto: UpdateInvestmentDto) {
    return this.InvestmentModel.findByIdAndUpdate(id, updateInvestmentDto);
  }

  async remove(id: number) {
    return this.InvestmentModel.findByIdAndRemove(id);
  }
}
