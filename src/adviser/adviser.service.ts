import { Injectable } from '@nestjs/common';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Adviser, AdviserDocument } from './schema/adviser.schema';

@Injectable()
export class AdviserService {

  constructor(@InjectModel(Adviser.name) private readonly AdviserModel: Model<AdviserDocument>) {}

  async create(createAdviserDto: CreateAdviserDto) {
    const Adviser = new this.AdviserModel(createAdviserDto);
    Adviser.userId = new Types.ObjectId(createAdviserDto.userId);
    return Adviser.save();
  }

  async findAll(): Promise <AdviserDocument[]> {
    return this.AdviserModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.AdviserModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async update(id: string, updateAdviserDto: UpdateAdviserDto) {
    updateAdviserDto.userId = new Types.ObjectId(updateAdviserDto.userId);
    return this.AdviserModel.findByIdAndUpdate(id, updateAdviserDto);
  }

  async remove(id: number) {
    return this.AdviserModel.findByIdAndRemove(id);
  }
}
