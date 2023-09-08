import { Injectable } from '@nestjs/common';
import { CreateWordGenDto } from './dto/create-word-gen.dto';
import { UpdateWordGenDto } from './dto/update-word-gen.dto';
import { UpdateContactdetailDto } from '../contactdetails/dto/update-contactdetail.dto';
import axios from "axios";
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WordGen, WordGenDocument } from './schema/word-gen.schema';

import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
const ImageModule = require('docxtemplater-image-module');
import fs from 'fs';
import { ContactdetailsService } from 'src/contactdetails/contactdetails.service';
import { InvestmentsService } from 'src/investments/investments.service';
import { InvestorTypeService } from 'src/investor-types/investor-types.service';
import { BankinfoService } from 'src/bankinfo/bankinfo.service';
import { DeposittypeService } from 'src/deposittype/deposittype.service';
import { AdviserService } from 'src/adviser/adviser.service';
import { VerificationService } from 'src/verification/verification.service';
import { FatcaService } from 'src/fatca/fatca.service';
import { WholesaleService } from 'src/wholesale/wholesale.service';
import { DeclarationService } from 'src/declaration/declaration.service';
const FormData = require('form-data');
const { Blob } = require('blob-util');


function rb64i(buffer: any): string {
  const binData = Buffer.from(buffer);
  const bufferData = binData.toString('base64');
  const imgUrl = `data:image/png;base64,${bufferData}`;
  return imgUrl;
}

function flattenObject(obj, prefix = '', flattened = {}) {
  // if(prefix == 'fatcas') console.log('^-^FATCAs Data: ', obj);
  console.log('^-^', prefix, ' Count : ', Object.keys(obj._doc).length);
  for (let [key, value] of Object.entries(obj._doc)) {
    var newPrefix = prefix ? `${prefix}.${key}` : key;
    console.log('^-^ : ', prefix, '.', key, ': ');
    switch (prefix) {
      case "verification":
        if (key == 'investor1Sign' || key == 'investor2Sign'
          || key == 'owner1Sign' || key == 'owner2Sign'
          || key == 'owner3Sign' || key == 'owner4Sign') {
          const buffer: any = value[0];
          const imageData = buffer.toString('base64');
          // flattened[newPrefix] = {
          //   data: imageData,
          //   width: 300,
          //   height: 140,
          //   extension: 'png'
          // };
        }
        break;
      case "fatcas":
        if (key == 'finalcial') {
          if (value == 'Yes') {
            flattened[newPrefix + 'Y'] = value;
            flattened[newPrefix + 'N'] = '';
          } else {
            flattened[newPrefix + 'N'] = value;
            flattened[newPrefix + 'Y'] = '';
          }
        } else if (key == 'istrust') {
          if (value == 'Yes') flattened[newPrefix] = value;
          else flattened[newPrefix] = 'No';
        } else
          flattened[newPrefix] = value;
        break;
      case "wholesales":
        if (key == 'status') {
          let statusval: any = value,
            defaultval = ['investing', 'proinvestor', 'netasset', 'finance', 'sophiinvestor'];
          defaultval.map(item => {
            flattened[prefix + '.' + item] = '';
          })
          statusval.map((item, index) => {
            // console.log('^-^', prefix + '.' + item);
            if (item == 'investing') flattened[prefix + '.' + item] = '☒';
            else if (item == 'proinvestor') flattened[prefix + '.' + item] = '☒';
            else if (item == 'netasset') flattened[prefix + '.' + item] = '☒';
            else if (item == 'finance') flattened[prefix + '.' + item] = '☒';
            else if (item == 'sophiinvestor') flattened[prefix + '.' + item] = '☒';
          });
        } else
          flattened[newPrefix] = value;
        break;
      case "declarations":
        if (key == 'owner1Sign' || key == 'owner2Sign') {
          const buffer: any = value;
          const bufferstring = buffer.toString('base64');
          const imageData = rb64i(bufferstring);
          console.log('^-^', key, ': ', imageData);
          flattened[newPrefix] = {
            data: imageData,
            width: 300,
            height: 140,
            extension: 'png'
          };
        } else
          flattened[newPrefix] = value;
        break;
      default:
        flattened[newPrefix] = value;
        break;
    }
  }

  return flattened;
}

@Injectable()
export class WordGenService {

  constructor(@InjectModel(WordGen.name) private readonly wordgenModel: Model<WordGenDocument>,
    private readonly contactdetailService: ContactdetailsService,
    private readonly investmentService: InvestmentsService,
    private readonly investorTypeService: InvestorTypeService,
    private readonly bankinfoService: BankinfoService,
    private readonly deposittypeService: DeposittypeService,
    private readonly adviserService: AdviserService,
    private readonly verificationService: VerificationService,
    private readonly fatcaService: FatcaService,
    private readonly wholesaleService: WholesaleService,
    private readonly declarationService: DeclarationService) { }

  async editWordDocument(templatePath: string, data: object): Promise<Buffer> {
    // Read the template file
    const content = await fs.promises.readFile('templates/' + templatePath, 'binary');

    // Load the template
    const zip = new PizZip(content);
    const doc = new Docxtemplater();
    doc.loadZip(zip);

    // Step 4: Attach the ImageModule to the doc instance
    doc.attachModule(new ImageModule({
      centered: false,
      getImage: (tagValue, tagName) => {
        // Check if the tag name is an image tag
        if (tagName.startsWith('image')) {
          const imageIndex = parseInt(tagName.slice(5)); // Get the index from the tag name
          const imageData = tagValue[imageIndex]; // Get the image data based on the index
          return {
            data: imageData, // Base64 image data
            width: 300,
            height: 140,
          };
        }
        return null;
      },
      getSize: (img, tagValue, tagName) => {
        // Calculate the size of the image dynamically based on its dimensions
        if (tagName.startsWith('image')) {
          const width = img.width; // Get the width of the image
          const height = img.height; // Get the height of the image
          const maxWidth = 500; // Define the maximum width for the image
          const maxHeight = 300; // Define the maximum height for the image
    
          // Calculate the new width and height while maintaining the aspect ratio
          let newWidth = width;
          let newHeight = height;
          if (width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (height * maxWidth) / width;
          }
          if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = (width * maxHeight) / height;
          }
    
          return [newWidth, newHeight];
        }
        return null;
      },
    }));    // Set the data to be injected into the template
    doc.setData(data);
    // console.log('^-^Doc Data : ', doc.getFullText());
    // Render the document
    doc.render();

    // Generate the updated document
    const updatedContent = doc.getZip().generate({ type: 'nodebuffer' });

    return updatedContent;
  }

  async writeOutputFile(outputPath: string, updatedContent: Buffer): Promise<string> {
    console.log('Output file ' + outputPath + ' has been written successfully.');
    var formdata = new FormData();
    formdata.append('outputpath', outputPath);
    // Convert the Buffer to a Blob
    // const blob = new Blob([updatedContent]);
    formdata.append('file', updatedContent, outputPath);

    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formdata,
      headers: {
        'pinata_api_key': `${process.env.PINATA_API_KEY}`,
        'pinata_secret_api_key': `${process.env.PINATA_API_SECRET}`,
        "Content-Type": "multipart/form-data"
      },
    });

    // const ipfsURL = "https://gateway.pinata.cloud/ipfs/"+ resFile.data.IpfsHash;
    // console.log('^-^ipfsURL : ', ipfsURL);
    await fs.promises.writeFile('files/' + outputPath, updatedContent);
    return await resFile.data.IpfsHash;

  }

  async create(createwordgenDto: CreateWordGenDto) {
    const wordgen = new this.wordgenModel(createwordgenDto);

    let contactdetails = await this.contactdetailService.findOne(createwordgenDto.userId.toString()),
      investments = await this.investmentService.findOne(createwordgenDto.userId.toString()),
      investortypes = await this.investorTypeService.findOne(createwordgenDto.userId.toString()),
      bankinfos = await this.bankinfoService.findOne(createwordgenDto.userId.toString()),
      deposittypes = await this.deposittypeService.findOne(createwordgenDto.userId.toString()),
      advisers = await this.adviserService.findOne(createwordgenDto.userId.toString()),
      verifications = await this.verificationService.findOne(createwordgenDto.userId.toString()),
      fatcas = await this.fatcaService.findOne(createwordgenDto.userId.toString()),
      wholesales = await this.wholesaleService.findOne(createwordgenDto.userId.toString()),
      declarations = await this.declarationService.findOne(createwordgenDto.userId.toString());

    let genDocName = createwordgenDto.userId.toString() + '_' + investortypes.label + '.docx',
      tempDocName = 'template_' + investortypes.label + '.docx';
    tempDocName = 'template.docx'; // this is just one for test.
    let flatobj0 = flattenObject(contactdetails, 'contactdetails'),
      flatobj1 = flattenObject(investments, 'investments'),
      flatobj2 = flattenObject(investortypes, 'investortypes'),
      flatobj3 = flattenObject(bankinfos, 'bankinfos'),
      flatobj4 = flattenObject(deposittypes, 'deposittypes'),
      flatobj5 = flattenObject(advisers, 'advisers'),
      // flatobj6 = flattenObject(verifications, 'verifications'),
      flatobj7 = flattenObject(fatcas, 'fatcas'),
      flatobj8 = flattenObject(wholesales, 'wholesales'),
      flatobj9 = flattenObject(declarations, 'declarations');

    let docxData = {
      ...flatobj0, ...flatobj1,
      ...flatobj2, ...flatobj3,
      ...flatobj4, ...flatobj5,
      // ...flatobj6, 
      ...flatobj7,
      ...flatobj8,
      ...flatobj9
    };

    // console.log('^-^Before Create Content : ', docxData);

    // Get the contents of the given docx file.
    let updatedcontent = await this.editWordDocument(tempDocName, docxData);
    createwordgenDto.orientation = await this.writeOutputFile(genDocName, updatedcontent);

    wordgen.userId = new Types.ObjectId(createwordgenDto.userId);
    wordgen.save();
    return createwordgenDto.orientation;
  }

  async findAll(): Promise<WordGen[]> {
    return this.wordgenModel.find().lean().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.wordgenModel.findOne({ userId: objectId }).populate('userId').lean().exec();
  }

  async update(id: string, updatewordgenDto: UpdateWordGenDto) {

    // Get the contents of the given docx file.
    let strOutStyle = updatewordgenDto.orientation == 'portrait' ? '☒' : '☐';
    let updateContactdetail: UpdateContactdetailDto;
    updateContactdetail = await this.contactdetailService.findOnes(updatewordgenDto.userId.toString());
    let investments = await this.investmentService.findOne(updatewordgenDto.userId.toString()),
      investortypes = await this.investorTypeService.findOne(updatewordgenDto.userId.toString()),
      bankinfos = await this.bankinfoService.findOne(updatewordgenDto.userId.toString()),
      deposittypes = await this.deposittypeService.findOne(updatewordgenDto.userId.toString()),
      advisers = await this.adviserService.findOne(updatewordgenDto.userId.toString()),
      verifications = await this.verificationService.findOne(updatewordgenDto.userId.toString()),
      fatcas = await this.fatcaService.findOne(updatewordgenDto.userId.toString()),
      wholesales = await this.wholesaleService.findOne(updatewordgenDto.userId.toString()),
      declarations = await this.declarationService.findOne(updatewordgenDto.userId.toString());

    let genDocName = updatewordgenDto.userId.toString() + '_' + investortypes.label + '.docx',
      tempDocName = 'template_' + investortypes.label + '.docx';
    tempDocName = 'template.docx'; // this is just one for test.

    // switch(investortypes.label) {
    //   case 'A & B':
    //     tempDocName = tempDocName + '_' + investortypes.label + '.docx';
    //     break;
    //   case 'C & E':
    //     genDocName = updatewordgenDto.userId.toString() + '_2.docx';
    //     break;
    //   case 'C':
    //     genDocName = updatewordgenDto.userId.toString() + '_1.docx';
    //     break;
    //   case 'C, D & E':
    //     break;
    //   case 'A, D & E':
    //     break;
    //   case 'C & D':
    //     break;
    //   case 'A & D':
    //     break;
    //   default:
    //     break;
    // }


    let flatobj0 = flattenObject(updateContactdetail, 'contactdetails'),
      flatobj1 = flattenObject(investments, 'investments'),
      flatobj2 = flattenObject(investortypes, 'investortypes'),
      flatobj3 = flattenObject(bankinfos, 'bankinfos'),
      flatobj4 = flattenObject(deposittypes, 'deposittypes'),
      flatobj5 = flattenObject(advisers, 'advisers'),
      // flatobj6 = flattenObject(verifications, 'verifications'),
      flatobj7 = flattenObject(fatcas, 'fatcas'),
      flatobj8 = flattenObject(wholesales, 'wholesales'),
      flatobj9 = flattenObject(declarations, 'declarations');

    let docxData = {
      ...flatobj0, ...flatobj1,
      ...flatobj2, ...flatobj3,
      ...flatobj4, ...flatobj5,
      // ...flatobj6, 
      ...flatobj7,
      ...flatobj8,
      ...flatobj9
    };

    // console.log('^-^Before Update Content : ', docxData);

    let updatedcontent = await this.editWordDocument(tempDocName, docxData);

    updatewordgenDto.userId = new Types.ObjectId(updatewordgenDto.userId);

    updatewordgenDto.orientation = await this.writeOutputFile(genDocName, updatedcontent);

    this.wordgenModel.findByIdAndUpdate(id, { $set: updatewordgenDto }).lean().exec();
    return updatewordgenDto.orientation;
  }

  async remove(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.wordgenModel.findByIdAndRemove(objectId).lean().exec();
  }
}
