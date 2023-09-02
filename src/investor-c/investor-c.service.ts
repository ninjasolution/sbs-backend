import { Injectable } from '@nestjs/common';
import { CreateInvestorCDto } from './dto/create-investor-c.dto';
import { UpdateInvestorCDto } from './dto/update-investor-c.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InvestorC, InvestorCDocument } from './schema/investor-c.schema';

@Injectable()
export class InvestorCService {

  constructor(@InjectModel(InvestorC.name) private readonly InvestorCModel: Model<InvestorCDocument>) {}  
  
  async create(createInvestorCDto: CreateInvestorCDto) {
    const investorC = new this.InvestorCModel(createInvestorCDto);
    investorC.userId = new Types.ObjectId(createInvestorCDto.userId);
    return investorC.save();
  }

  async findAll(): Promise <InvestorCDocument[]> {
    return this.InvestorCModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.InvestorCModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async update(id: string, updateInvestorCDto: UpdateInvestorCDto) {
    updateInvestorCDto.userId = new Types.ObjectId(updateInvestorCDto.userId);
    return this.InvestorCModel.findByIdAndUpdate(id, updateInvestorCDto);
  }

  async remove(id: number) {
    return this.InvestorCModel.findByIdAndRemove(id);
  }
}
