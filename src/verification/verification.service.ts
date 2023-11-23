import { Injectable } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Verification, VerificationDocument } from './schema/verification.schema';

@Injectable()
export class VerificationService {

  constructor(@InjectModel(Verification.name) private readonly VerificationModel: Model<VerificationDocument>) {}

  private cb64i(src: string) {
    // Split the src to separate the MIME type and base64 data
    const [mime, base64Data] = src.split(';base64,');
    console.log('^-^Mime : ', mime);
    // console.log('^-^Base64 : ', base64Data.substring(0, 20));
    return Buffer.from(base64Data, 'base64');
  }
  
  async create(createVerificationDto: CreateVerificationDto) {
    const verification = new this.VerificationModel();
    const investor1Sign = this.cb64i(createVerificationDto.investor1Sign);
    const owner1Sign = this.cb64i(createVerificationDto.owner1Sign);

    // console.log('^-^frontScreen : ', createVerificationDto.frontScreen);

    if(createVerificationDto.investor2Sign != 'undefined')
    verification.investor2Sign = this.cb64i(createVerificationDto.investor2Sign);
    if(createVerificationDto.owner2Sign != 'undefined')
    verification.owner2Sign = this.cb64i(createVerificationDto.owner2Sign);
    if(createVerificationDto.owner3Sign != 'undefined')
    verification.owner3Sign = this.cb64i(createVerificationDto.owner3Sign);
    if(createVerificationDto.owner4Sign != 'undefined')
    verification.owner4Sign = this.cb64i(createVerificationDto.owner4Sign);
    if(createVerificationDto.frontScreen != undefined)
    verification.frontScreen = this.cb64i(createVerificationDto.frontScreen);
    if(createVerificationDto.backScreen != undefined)
    verification.backScreen = this.cb64i(createVerificationDto.backScreen);
    if(createVerificationDto.selectedImage != 'undefined')
    verification.selectedImage = this.cb64i(createVerificationDto.selectedImage);
    
    verification.investor1Sign = investor1Sign;
    verification.owner1Sign = owner1Sign;
    // console.log('^-^Selected Images : ', selectedImage);
    verification.investor1 = createVerificationDto.investor1;
    verification.investor2 = createVerificationDto.investor2;
    verification.owner1 = createVerificationDto.owner1;
    verification.owner2 = createVerificationDto.owner2;
    verification.owner3 = createVerificationDto.owner3;
    verification.owner4 = createVerificationDto.owner4;
    verification.userId = createVerificationDto.userId;
    verification.userId = new Types.ObjectId(createVerificationDto.userId);
    return verification.save();
  }

  async findAll(): Promise <VerificationDocument[]> {
    return this.VerificationModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.VerificationModel.findOne({userId: objectId}).populate('userId').exec();
  }

  async update(id: string, updateVerificationDto: UpdateVerificationDto) {
    let verificationData : any = {
      investor1Sign: null,
      owner1Sign: null,
      investor2Sign: null,
      owner2Sign: null,
      owner3Sign: null,
      owner4Sign: null,
      frontScreen: null,
      backScreen: null,
      selectedImage: null,
      investor1: '',
      investor2: '',
      owner1: '',
      owner2: '',
      owner3: '',
      owner4: '',
    };
    const investor1Sign = this.cb64i(updateVerificationDto.investor1Sign);
    const owner1Sign = this.cb64i(updateVerificationDto.owner1Sign);

    verificationData.investor1 = updateVerificationDto.investor1;
    verificationData.investor2 = updateVerificationDto.investor2;
    verificationData.owner1 = updateVerificationDto.owner1;
    verificationData.owner2 = updateVerificationDto.owner2;
    verificationData.owner3 = updateVerificationDto.owner3;
    verificationData.owner4 = updateVerificationDto.owner4;

    verificationData.investor1Sign = investor1Sign;
    verificationData.owner1Sign = owner1Sign;

    // console.log('^-^frontScreen : ', updateVerificationDto.frontScreen);
    // console.log('^^^selectedImage:', this.cb64i(updateVerificationDto.selectedImage))
    if(updateVerificationDto.investor2Sign != 'undefined')
        verificationData.investor2Sign = this.cb64i(updateVerificationDto.investor2Sign);
    if(updateVerificationDto.owner2Sign != 'undefined')
        verificationData.owner2Sign = this.cb64i(updateVerificationDto.owner2Sign);
    if(updateVerificationDto.owner3Sign != 'undefined')
        verificationData.owner3Sign = this.cb64i(updateVerificationDto.owner3Sign);
    if(updateVerificationDto.owner4Sign != 'undefined')
        verificationData.owner4Sign = this.cb64i(updateVerificationDto.owner4Sign);
    if(updateVerificationDto.frontScreen != undefined)
        verificationData.frontScreen = this.cb64i(updateVerificationDto.frontScreen);
    if(updateVerificationDto.backScreen != undefined)
        verificationData.backScreen = this.cb64i(updateVerificationDto.backScreen);
    if(updateVerificationDto.selectedImage != 'undefined')
        verificationData.selectedImage = this.cb64i(updateVerificationDto.selectedImage);

    verificationData.userId = new Types.ObjectId(updateVerificationDto.userId);
    return this.VerificationModel.findByIdAndUpdate(id, { $set: verificationData });
  }

  async remove(id: number) {
    return this.VerificationModel.findByIdAndRemove(id);
  }
}
