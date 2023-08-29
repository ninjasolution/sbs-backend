import { Injectable } from '@nestjs/common';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import { UpdateDeclarationDto } from './dto/update-declaration.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Declaration, DeclarationDocument } from './schema/declaration.schema';

@Injectable()
export class DeclarationService {

  constructor(@InjectModel(Declaration.name) private readonly DeclarationModel: Model<DeclarationDocument>) {}

  private cb64i(src: string) {
    // Split the src to separate the MIME type and base64 data
    const [mime, base64Data] = src.split(';base64,');
    console.log('^-^Mime : ', mime);
    console.log('^-^Base64 : ', base64Data.substring(0, 20));
    return Buffer.from(base64Data, 'base64');
  }

  async create(createDeclarationDto: CreateDeclarationDto) {
    const Declaration = new this.DeclarationModel(createDeclarationDto);
    const owner1Sign = createDeclarationDto.owner1Sign ? this.cb64i(createDeclarationDto.owner1Sign) : null;
    const owner2Sign = createDeclarationDto.owner2Sign ? this.cb64i(createDeclarationDto.owner2Sign) : null;
    if(owner1Sign) Declaration.owner1Sign = owner1Sign;
    if(owner2Sign) Declaration.owner2Sign = owner2Sign;
    return Declaration.save();
  }

  async findAll(): Promise <DeclarationDocument[]> {
    return this.DeclarationModel.find().exec();
  }

  async findOne(id: string) {
    return this.DeclarationModel.findOne({userId: id});
  }

  async update(id: string, updateDeclarationDto: UpdateDeclarationDto) {
    const Declaration = new this.DeclarationModel(updateDeclarationDto);
    const owner1Sign = updateDeclarationDto.owner1Sign ? this.cb64i(updateDeclarationDto.owner1Sign) : null;
    const owner2Sign = updateDeclarationDto.owner2Sign ? this.cb64i(updateDeclarationDto.owner2Sign) : null;
    if(owner1Sign) Declaration.owner1Sign = owner1Sign;
    if(owner2Sign) Declaration.owner2Sign = owner2Sign;
    return this.DeclarationModel.findByIdAndUpdate(id, { $set: Declaration });
  }

  async remove(id: number) {
    return this.DeclarationModel.findByIdAndRemove(id);
  }
}
