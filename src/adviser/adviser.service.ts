import { Injectable } from '@nestjs/common';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Adviser, AdviserDocument } from './schema/adviser.schema';

@Injectable()
export class AdviserService {

  constructor(@InjectModel(Adviser.name) private readonly AdviserModel: Model<AdviserDocument>) {}

  async create(createAdviserDto: CreateAdviserDto) {
    const Adviser = new this.AdviserModel(createAdviserDto);
    return Adviser.save();
  }

  async findAll(): Promise <AdviserDocument[]> {
    return this.AdviserModel.find().exec();
  }

  async findOne(id: string) {
    return this.AdviserModel.findOne({userId: id});
  }

  async update(id: string, updateAdviserDto: UpdateAdviserDto) {
    return this.AdviserModel.findByIdAndUpdate(id, updateAdviserDto);
  }

  async remove(id: number) {
    return this.AdviserModel.findByIdAndRemove(id);
  }
}
