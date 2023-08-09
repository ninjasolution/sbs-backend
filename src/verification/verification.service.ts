import { Injectable } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Verification, VerificationDocument } from './schema/verification.schema';

@Injectable()
export class VerificationService {

  constructor(@InjectModel(Verification.name) private readonly VerificationModel: Model<VerificationDocument>) {}

  async create(createVerificationDto: CreateVerificationDto) {
    const Verification = new this.VerificationModel(createVerificationDto);
    return Verification.save();
  }

  async findAll(): Promise <VerificationDocument[]> {
    return this.VerificationModel.find().exec();
  }

  async findOne(id: number) {
    return this.VerificationModel.findById(id);
  }

  async update(id: number, updateVerificationDto: UpdateVerificationDto) {
    return this.VerificationModel.findByIdAndUpdate(id, updateVerificationDto);
  }

  async remove(id: number) {
    return this.VerificationModel.findByIdAndRemove(id);
  }
}
