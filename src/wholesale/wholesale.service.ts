import { Injectable } from '@nestjs/common';
import { CreateWholesaleDto } from './dto/create-wholesale.dto';
import { UpdateWholesaleDto } from './dto/update-wholesale.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wholesale, WholesaleDocument } from './schema/wholesale.schema';

@Injectable()
export class WholesaleService {

  constructor(@InjectModel(Wholesale.name) private readonly WholesaleModel: Model<WholesaleDocument>) {}

  async create(createWholesaleDto: CreateWholesaleDto) {
    const Wholesale = new this.WholesaleModel(createWholesaleDto);
    return Wholesale.save();
  }

  async findAll(): Promise <WholesaleDocument[]> {
    return this.WholesaleModel.find().exec();
  }

  async findOne(id: string) {
    return this.WholesaleModel.findOne({userId: id});
  }

  async update(id: string, updateWholesaleDto: UpdateWholesaleDto) {
    return this.WholesaleModel.findByIdAndUpdate(id, updateWholesaleDto);
  }

  async remove(id: number) {
    return this.WholesaleModel.findByIdAndRemove(id);
  }
}
