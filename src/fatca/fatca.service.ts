import { Injectable } from '@nestjs/common';
import { CreateFatcaDto } from './dto/create-fatca.dto';
import { UpdateFatcaDto } from './dto/update-fatca.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Fatca, FatcaDocument } from './schema/fatca.schema';

@Injectable()
export class FatcaService {

  constructor(@InjectModel(Fatca.name) private readonly FatcaModel: Model<FatcaDocument>) {}

  async create(createFatcaDto: CreateFatcaDto) {
    const Fatca = new this.FatcaModel(createFatcaDto);
    Fatca.userId = new Types.ObjectId(createFatcaDto.userId);
    return Fatca.save();
  }

  async findAll(): Promise <FatcaDocument[]> {
    return this.FatcaModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.FatcaModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async update(id: string, updateFatcaDto: UpdateFatcaDto) {
    updateFatcaDto.userId = new Types.ObjectId(updateFatcaDto.userId);
    return this.FatcaModel.findByIdAndUpdate(id, updateFatcaDto);
  }

  async remove(id: number) {
    return this.FatcaModel.findByIdAndRemove(id);
  }
}
