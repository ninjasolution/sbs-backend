import { Injectable } from '@nestjs/common';
import { CreateDeposittypeDto } from './dto/create-deposittype.dto';
import { UpdateDeposittypeDto } from './dto/update-deposittype.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Deposittype, DeposittypeDocument } from './schema/deposittype.schema';

@Injectable()
export class DeposittypeService {

  constructor(@InjectModel(Deposittype.name) private readonly DeposittypeModel: Model<DeposittypeDocument>) {}

  async create(createDeposittypeDto: CreateDeposittypeDto) {
    const Deposittype = new this.DeposittypeModel(createDeposittypeDto);
    Deposittype.bankinfoId = new Types.ObjectId(createDeposittypeDto.bankinfoId);
    Deposittype.userId = new Types.ObjectId(createDeposittypeDto.userId);
    return Deposittype.save();
  }

  async findAll(): Promise <DeposittypeDocument[]> {
    return this.DeposittypeModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.DeposittypeModel.findOne({userId: objectId}).populate('userId').populate('bankinfoId').exec();
  }

  async update(id: string, updateDeposittypeDto: UpdateDeposittypeDto) {
    updateDeposittypeDto.bankinfoId = new Types.ObjectId(updateDeposittypeDto.bankinfoId);
    updateDeposittypeDto.userId = new Types.ObjectId(updateDeposittypeDto.userId);
    return this.DeposittypeModel.findByIdAndUpdate(id, updateDeposittypeDto);
  }

  async remove(id: number) {
    return this.DeposittypeModel.findByIdAndRemove(id);
  }
}
