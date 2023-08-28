import { Injectable } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Verification, VerificationDocument } from './schema/verification.schema';

@Injectable()
export class VerificationService {

  constructor(@InjectModel(Verification.name) private readonly VerificationModel: Model<VerificationDocument>) {}

  private cb64i(src: string) {
    // Split the src to separate the MIME type and base64 data
    const [mime, base64Data] = src.split(';base64,');
    console.log('^-^Mime : ', mime);
    console.log('^-^Base64 : ', base64Data.substring(0, 20));
    return Buffer.from(base64Data, 'base64');
  }
  
  async create(createVerificationDto: CreateVerificationDto) {
    const investor1Sign = this.cb64i(createVerificationDto.investor1Sign);
    const investor2Sign = this.cb64i(createVerificationDto.investor2Sign);
    const owner1Sign = this.cb64i(createVerificationDto.owner1Sign);
    const owner2Sign = this.cb64i(createVerificationDto.owner2Sign);
    const owner3Sign = this.cb64i(createVerificationDto.owner3Sign);
    const owner4Sign = this.cb64i(createVerificationDto.owner4Sign);
    const frontScreen = this.cb64i(createVerificationDto.frontScreen);
    const backScreen = this.cb64i(createVerificationDto.backScreen);
    const selectedImage = this.cb64i(createVerificationDto.selectedImage);
    const verification = new this.VerificationModel();
    verification.investor1Sign = investor1Sign;
    verification.investor2Sign = investor2Sign;
    verification.owner1Sign = owner1Sign;
    verification.owner2Sign = owner2Sign;
    verification.owner3Sign = owner3Sign;
    verification.owner4Sign = owner4Sign;
    verification.backScreen = backScreen;
    verification.frontScreen = frontScreen;
    verification.selectedImage = selectedImage;
    console.log('^-^Selected Images : ', selectedImage);
    verification.investor1 = createVerificationDto.investor1;
    verification.investor2 = createVerificationDto.investor2;
    verification.owner1 = createVerificationDto.owner1;
    verification.owner2 = createVerificationDto.owner2;
    verification.owner3 = createVerificationDto.owner3;
    verification.owner4 = createVerificationDto.owner4;
    verification.userId = createVerificationDto.userId;
    return verification.save();
  }

  async findAll(): Promise <VerificationDocument[]> {
    return this.VerificationModel.find().exec();
  }

  async findOne(id: string) {
    return this.VerificationModel.findOne({userId: id});
  }

  async update(id: string, updateVerificationDto: UpdateVerificationDto) {

    const frontScreen = (updateVerificationDto.frontScreen) ? this.cb64i(updateVerificationDto.frontScreen) : null;
    const backScreen = (updateVerificationDto.backScreen) ? this.cb64i(updateVerificationDto.backScreen) : null;
    console.log('^-^Front Screen : ', frontScreen);
    const verificationData = {
      investor1Sign: this.cb64i(updateVerificationDto.investor1Sign),
      investor2Sign: this.cb64i(updateVerificationDto.investor2Sign),
      owner1Sign: this.cb64i(updateVerificationDto.owner1Sign),
      owner2Sign: this.cb64i(updateVerificationDto.owner2Sign),
      owner3Sign: this.cb64i(updateVerificationDto.owner3Sign),
      owner4Sign: this.cb64i(updateVerificationDto.owner4Sign),
      selectedImage: this.cb64i(updateVerificationDto.selectedImage),
      investor1: updateVerificationDto.investor1,
      investor2: updateVerificationDto.investor2,
      owner1: updateVerificationDto.owner1,
      owner2: updateVerificationDto.owner2,
      owner3: updateVerificationDto.owner3,
      owner4: updateVerificationDto.owner4,
      userId: updateVerificationDto.userId
    };
  
    if (backScreen !== null) {
      verificationData['backScreen'] = backScreen;
    }
    
    if (frontScreen !== null) {
      verificationData['frontScreen'] = frontScreen;
    }
  
    return this.VerificationModel.findByIdAndUpdate(id, { $set: verificationData });
  }

  async remove(id: number) {
    return this.VerificationModel.findByIdAndRemove(id);
  }
}
