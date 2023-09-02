import { Injectable } from '@nestjs/common';
import { CreateBankinfoDto } from './dto/create-bankinfo.dto';
import { UpdateBankinfoDto } from './dto/update-bankinfo.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bankinfo, BankinfoDocument } from './schema/bankinfo.schema';

@Injectable()
export class BankinfoService {

  constructor(@InjectModel(Bankinfo.name) private readonly BankinfoModel: Model<BankinfoDocument>) {}

  async create(createBankinfoDto: CreateBankinfoDto) {
    const Bankinfo = new this.BankinfoModel(createBankinfoDto);
    Bankinfo.userId = new Types.ObjectId(createBankinfoDto.userId);
    return Bankinfo.save();
  }

  async findAll(): Promise <BankinfoDocument[]> {
    return this.BankinfoModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.BankinfoModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async update(id: string, updateBankinfoDto: UpdateBankinfoDto) {
    updateBankinfoDto.userId = new Types.ObjectId(updateBankinfoDto.userId);
    return this.BankinfoModel.findByIdAndUpdate(id, updateBankinfoDto);
  }

  async remove(id: number) {
    return this.BankinfoModel.findByIdAndRemove(id);
  }
}
