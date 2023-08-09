import { Injectable } from '@nestjs/common';
import { CreateDeposittypeDto } from './dto/create-deposittype.dto';
import { UpdateDeposittypeDto } from './dto/update-deposittype.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deposittype, DeposittypeDocument } from './schema/deposittype.schema';

@Injectable()
export class DeposittypeService {

  constructor(@InjectModel(Deposittype.name) private readonly DeposittypeModel: Model<DeposittypeDocument>) {}

  async create(createDeposittypeDto: CreateDeposittypeDto) {
    const Deposittype = new this.DeposittypeModel(createDeposittypeDto);
    return Deposittype.save();
  }

  async findAll(): Promise <DeposittypeDocument[]> {
    return this.DeposittypeModel.find().exec();
  }

  async findOne(id: number) {
    return this.DeposittypeModel.findById(id);
  }

  async update(id: number, updateDeposittypeDto: UpdateDeposittypeDto) {
    return this.DeposittypeModel.findByIdAndUpdate(id, updateDeposittypeDto);
  }

  async remove(id: number) {
    return this.DeposittypeModel.findByIdAndRemove(id);
  }
}
