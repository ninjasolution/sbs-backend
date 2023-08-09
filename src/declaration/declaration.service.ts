import { Injectable } from '@nestjs/common';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import { UpdateDeclarationDto } from './dto/update-declaration.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Declaration, DeclarationDocument } from './schema/declaration.schema';

@Injectable()
export class DeclarationService {

  constructor(@InjectModel(Declaration.name) private readonly DeclarationModel: Model<DeclarationDocument>) {}

  async create(createDeclarationDto: CreateDeclarationDto) {
    const Declaration = new this.DeclarationModel(createDeclarationDto);
    return Declaration.save();
  }

  async findAll(): Promise <DeclarationDocument[]> {
    return this.DeclarationModel.find().exec();
  }

  async findOne(id: number) {
    return this.DeclarationModel.findById(id);
  }

  async update(id: number, updateDeclarationDto: UpdateDeclarationDto) {
    return this.DeclarationModel.findByIdAndUpdate(id, updateDeclarationDto);
  }

  async remove(id: number) {
    return this.DeclarationModel.findByIdAndRemove(id);
  }
}
