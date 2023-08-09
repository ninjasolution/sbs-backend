import { Injectable } from '@nestjs/common';
import { CreateBankinfoDto } from './dto/create-bankinfo.dto';
import { UpdateBankinfoDto } from './dto/update-bankinfo.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bankinfo, BankinfoDocument } from './schema/bankinfo.schema';

@Injectable()
export class BankinfoService {

  constructor(@InjectModel(Bankinfo.name) private readonly BankinfoModel: Model<BankinfoDocument>) {}

  async create(createBankinfoDto: CreateBankinfoDto) {
    const Bankinfo = new this.BankinfoModel(createBankinfoDto);
    return Bankinfo.save();
  }

  async findAll(): Promise <BankinfoDocument[]> {
    return this.BankinfoModel.find().exec();
  }

  async findOne(id: number) {
    return this.BankinfoModel.findById(id);
  }

  async update(id: number, updateBankinfoDto: UpdateBankinfoDto) {
    return this.BankinfoModel.findByIdAndUpdate(id, updateBankinfoDto);
  }

  async remove(id: number) {
    return this.BankinfoModel.findByIdAndRemove(id);
  }
}
