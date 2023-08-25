import { Injectable } from '@nestjs/common';
import { CreateContactdetailDto } from './dto/create-contactdetail.dto';
import { UpdateContactdetailDto } from './dto/update-contactdetail.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contactdetail, ContactdetailDocument } from './schema/contactdetails.schema';

@Injectable()
export class ContactdetailsService {
  constructor(@InjectModel(Contactdetail.name) private readonly ContactDetailModel: Model <ContactdetailDocument>) {}

  async create(createContactdetailDto: CreateContactdetailDto) {
    console.log('^-^contact creating... ', createContactdetailDto);
    const contactdetail = new this.ContactDetailModel(createContactdetailDto);
    return contactdetail.save();
  }

  async findAll(): Promise <ContactdetailDocument[] > {
    return this.ContactDetailModel.find().exec();
  }

  async findOne(id: string) {
    console.log('^-^contact for ' + id);
    return this.ContactDetailModel.findOne({userId: id});
  }

  async update(id: string, updateContactdetailDto: UpdateContactdetailDto) {
    console.log('^-^Update contact ', id);
    return this.ContactDetailModel.findByIdAndUpdate(id, updateContactdetailDto);
  }

  async remove(id: number) {
    return this.ContactDetailModel.findByIdAndRemove(id);
  }
}
