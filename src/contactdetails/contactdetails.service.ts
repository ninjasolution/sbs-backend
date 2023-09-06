import { Injectable } from '@nestjs/common';
import { CreateContactdetailDto } from './dto/create-contactdetail.dto';
import { UpdateContactdetailDto } from './dto/update-contactdetail.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Contactdetail, ContactdetailDocument } from './schema/contactdetails.schema';

@Injectable()
export class ContactdetailsService {
  constructor(@InjectModel(Contactdetail.name) private readonly ContactDetailModel: Model <ContactdetailDocument>) {}

  async create(createContactdetailDto: CreateContactdetailDto) {
    // console.log('^-^contact creating... ', createContactdetailDto);
    await this.ContactDetailModel.deleteMany({ userId: null });
    const contactdetail = new this.ContactDetailModel(createContactdetailDto);
    contactdetail.userId = new Types.ObjectId(createContactdetailDto.userId);
    console.log('^-^create contactdetail ', contactdetail);
    return contactdetail.save();
  }

  async findAll(): Promise <ContactdetailDocument[] > {
    return this.ContactDetailModel.find().exec();
  }

  async findOne(id: string) {
    console.log('^-^contact for ' + id);
    const objectId = new Types.ObjectId(id);
    return await this.ContactDetailModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async findOnes(id: string) {
    const objectId = new Types.ObjectId(id);
    return await this.ContactDetailModel.findOne({userId: objectId}).exec();
  }

  async update(id: string, updateContactdetailDto: UpdateContactdetailDto) {
    console.log('^-^Update contact ', id);
    updateContactdetailDto.userId = new Types.ObjectId(updateContactdetailDto.userId);
    return this.ContactDetailModel.findByIdAndUpdate(id, updateContactdetailDto);
  }

  async remove(id: number) {
    return this.ContactDetailModel.findByIdAndRemove(id);
  }
}
