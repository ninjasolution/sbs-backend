import { Injectable } from '@nestjs/common';
import { CreateWholesaleDto } from './dto/create-wholesale.dto';
import { UpdateWholesaleDto } from './dto/update-wholesale.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Wholesale, WholesaleDocument } from './schema/wholesale.schema';

@Injectable()
export class WholesaleService {

  constructor(@InjectModel(Wholesale.name) private readonly WholesaleModel: Model<WholesaleDocument>) {}

  async create(createWholesaleDto: CreateWholesaleDto) {
    const Wholesale = new this.WholesaleModel(createWholesaleDto);
    Wholesale.userId = new Types.ObjectId(createWholesaleDto.userId);
    return Wholesale.save();
  }

  async findAll(): Promise <WholesaleDocument[]> {
    return this.WholesaleModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.WholesaleModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async update(id: string, updateWholesaleDto: UpdateWholesaleDto) {
    updateWholesaleDto.userId = new Types.ObjectId(updateWholesaleDto.userId);
    return this.WholesaleModel.findByIdAndUpdate(id, updateWholesaleDto);
  }

  async remove(id: number) {
    return this.WholesaleModel.findByIdAndRemove(id);
  }
}
