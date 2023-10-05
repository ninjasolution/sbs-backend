import { Injectable } from '@nestjs/common';
import { CreateWordGenDto } from './dto/create-word-gen.dto';
import { UpdateWordGenDto } from './dto/update-word-gen.dto';
import { UpdateContactdetailDto } from '../contactdetails/dto/update-contactdetail.dto';
import axios from "axios";
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WordGen, WordGenDocument } from './schema/word-gen.schema';
import { EmailService } from './../services/mail.service';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import { ContactdetailsService } from 'src/contactdetails/contactdetails.service';
import { InvestmentsService } from 'src/investments/investments.service';
import { InvestorTypeService } from 'src/investor-types/investor-types.service';
import { InvestorAService } from 'src/investor-a/investor-a.service';
import { InvestorBService } from 'src/investor-b/investor-b.service';
import { InvestorCService } from 'src/investor-c/investor-c.service';
import { InvestorDService } from 'src/investor-d/investor-d.service';
import { InvestorEService } from 'src/investor-e/investor-e.service';
import { BankinfoService } from 'src/bankinfo/bankinfo.service';
import { DeposittypeService } from 'src/deposittype/deposittype.service';
import { AdviserService } from 'src/adviser/adviser.service';
import { VerificationService } from 'src/verification/verification.service';
import { FatcaService } from 'src/fatca/fatca.service';
import { WholesaleService } from 'src/wholesale/wholesale.service';
import { DeclarationService } from 'src/declaration/declaration.service';
import { InvestorA } from 'src/investor-a/entities/investor-a.entity';
import mammoth from 'mammoth';
import puppeteer from 'puppeteer';
import * as libreofficeConvert from 'libreoffice-convert';

const FormData = require('form-data');
const { Blob } = require('blob-util');
const ImageModule = require('docxtemplater-image-module-free');


function rb64i(buffer: any): string {
  const binData = Buffer.from(buffer);
  const bufferData = binData.toString('base64');
  const imgUrl = `data:image/png;base64,${bufferData}`;
  return imgUrl;
}
function cb64i(src: string) {
  // Split the src to separate the MIME type and base64 data
  const [mime, base64Data] = src.split(';base64,');
  console.log('^-^Mime : ', mime);
  console.log('^-^Base64 : ', base64Data.substring(0, 20));
  return Buffer.from(base64Data, 'base64');
}

function flattenObject(obj, prefix = '', flattened = {}) {
  console.log('^-^', prefix);
  if(obj == null) return null;
  console.log(' Count : ', Object.keys(obj._doc).length);
  for (let [key, value] of Object.entries(obj._doc)) {
    var newPrefix = prefix ? `${prefix}.${key}` : key;
    if(key == '__v' || key == 'userId') continue;
    // console.log('^-^ : ', prefix, '.', key, ': ');
    switch (prefix) {
      case "verifications":
        if (key == 'investor1Sign' || key == 'investor2Sign'
          || key == 'owner1Sign' || key == 'owner2Sign'
          || key == 'owner3Sign' || key == 'owner4Sign' || key == 'backScreen' || key == 'frontScreen' || key == 'selectedImage') {
          const buffer: any = value;
          const bufferstring = buffer.toString('base64');
          const imageType = (key == 'backScreen' || key == 'frontScreen' || key == 'selectedImage') ? 'jpg' : 'png';
          const dataUrl = `data:image/${imageType};base64,${bufferstring}`;
          flattened[newPrefix] = dataUrl;
        } else
          flattened[newPrefix] = value;
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
          const dataUrl = `data:image/png;base64,${bufferstring}`;
          flattened[newPrefix] = dataUrl;
        } else {
          // console.log(value);
          let defaultval = ['name2', 'date2', 'title2', 'type2', 'other2'];
          defaultval.map(item => {
            flattened[prefix + '.' + item] = '';
          });
          flattened[newPrefix] = value;
        }
        break;
      default:
        flattened[newPrefix] = value;
        break;
    }
  }

  return flattened;
}
const maxImageWidth = 350;
const maxImageHeight = 300;
@Injectable()
export class WordGenService {

  constructor(@InjectModel(WordGen.name) private readonly wordgenModel: Model<WordGenDocument>,
    private readonly contactdetailService: ContactdetailsService,
    private readonly investmentService: InvestmentsService,
    private readonly investorTypeService: InvestorTypeService,
    private readonly investorAService: InvestorAService,
    private readonly investorBService: InvestorBService,
    private readonly investorCService: InvestorCService,
    private readonly investorDService: InvestorDService,
    private readonly investorEService: InvestorEService,
    private readonly bankinfoService: BankinfoService,
    private readonly deposittypeService: DeposittypeService,
    private readonly adviserService: AdviserService,
    private readonly verificationService: VerificationService,
    private readonly fatcaService: FatcaService,
    private readonly wholesaleService: WholesaleService,
    private readonly declarationService: DeclarationService,
    public mailService: EmailService) { }
    
    async convertToPdf(inputFile: Buffer, outputFilePath: string): Promise<any> {
      return new Promise((resolve, reject) => {
        libreofficeConvert.convert(inputFile, '.pdf', undefined, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

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
        const base64Data = (tagName.includes('backScreen') || tagName.includes('frontScreen') || tagName.includes('selectedImage')) ? tagValue.replace(/^data:image\/jpg;base64,/, '') : tagValue.replace(/^data:image\/png;base64,/, '');
        // const base64Data = tagValue.replace(/^data:image\/png;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        return imageBuffer;
      },
      getSize: (img, tagValue, tagName) => {
        // Check if the tag name is an image tag
        // console.log('^-^Image GetSize : ', tagName, img);
        if (tagName === 'verifications.owner1Sign' || tagName === 'verifications.investor2Sign' || tagName === 'verifications.investor3Sign' || tagName === 'verifications.investor4Sign' || tagName === 'verifications.owner1Sign' || tagName === 'verifications.owner2Sign' || tagName === 'verifications.backScreen' || tagName === 'verifications.frontScreen' || tagName === 'verifications.selectedImage' || tagName === 'declarations.owner1Sign' || tagName === 'declarations.owner2Sign') {
          const src: any = img;
          // const imgdata: any = cb64i(src);
          // console.log('^-^Image tag : ', tagName);
          // if(tagName == 'declarations.owner2Sign') console.log('^-^Image Data : ', img.toString().substr(20));
          if(img == null || img == '' || img == undefined) {
            // console.log('^-^Get Images : ', tagName, img.toString().substr(20));
            return [300, 140];
          }
          const sizeOf = require('image-size');
          const dimensions = sizeOf(img);
          // console.log('^-^Get Images : ', tagName, dimensions.width, dimensions.height);
          const { width, height } = dimensions;

          let newWidth = width;
          let newHeight = height;
      
          if (width > maxImageWidth) {
            newWidth = maxImageWidth;
            newHeight *= maxImageWidth / width;
          }

          // if (height > maxImageHeight) {
          //   newHeight = maxImageHeight;
          //   newWidth *= maxImageHeight / height;
          // }          
          return [newWidth, newHeight];
        }
        return [300, 140];
      },
    }));
    // Object.getOwnPropertyNames(data).map(key => console.log('^-^', key));
    doc.setData(data);
    // console.log('^-^Doc Data : ', doc.getFullText());
    // Render the document
    doc.render();

    // Generate the updated document
    const updatedContent = doc.getZip().generate({ type: 'nodebuffer' });

    return updatedContent;
  }

  async writeOutputFile(outputPath: string, updatedContent: Buffer, user: any): Promise<string> {

    // // Convert DOCX content to HTML
    // const { value: html } = await mammoth.convertToHtml({ buffer: updatedContent });
    // // console.log('HTML content for DOCX: ', html);
    // // Generate PDF from HTML using Puppeteer
    // const browser = await puppeteer.launch({
    //   headless: "new", // or false, depending on your use case
    // });
    // const page = await browser.newPage();
    // await page.setContent(html);
    // const pdfBuffer = await page.pdf();
    // await browser.close();
    const pdfBuffer = await this.convertToPdf(updatedContent, 'files/' + outputPath);
    console.log('Output file ' + outputPath + ' has been written successfully.');
    // const pdfBuffer = await fs.promises.readFile('files/' + outputPath);
    var formdata = new FormData();
    formdata.append('outputpath', pdfBuffer);
    // Convert the Buffer to a Blob
    // const blob = new Blob([updatedContent]);
    formdata.append('file', pdfBuffer, outputPath);

    const resFile = await axios({
      method: "post",
      url: process.env.IPFS_PATH,
      data: formdata,
      headers: {
        'pinata_api_key': `${process.env.PINATA_API_KEY}`,
        'pinata_secret_api_key': `${process.env.PINATA_API_SECRET}`,
        "Content-Type": "multipart/form-data"
      },
    });
    // console.log('^-^-^-^', resFile);
    const ipfsURL = process.env.IPFS_CLOUD + resFile.data.IpfsHash;
    // send mails.
    user = { ...user, ...{ docpath: ipfsURL }};
    console.log('^-^Send mail Company2User ');
    await this.mailService.sendCompany2User(user);
    console.log('^-^Send mail User2Company ');
    await this.mailService.sendUser2Company(user);
    // console.log('^-^ipfsURL : ', ipfsURL);
    return await resFile.data.IpfsHash;

  }

  async create(createwordgenDto: CreateWordGenDto) {
    const wordgen = new this.wordgenModel(createwordgenDto);

    let contactdetails = await this.contactdetailService.findOne(createwordgenDto.userId.toString()),
      investments = await this.investmentService.findOne(createwordgenDto.userId.toString()),
      investortypes = await this.investorTypeService.findOne(createwordgenDto.userId.toString()),
      investorAs = await this.investorAService.findOne(createwordgenDto.userId.toString()),
      investorBs = await this.investorBService.findOne(createwordgenDto.userId.toString()),
      investorCs = await this.investorCService.findOne(createwordgenDto.userId.toString()),
      investorDs = await this.investorDService.findOne(createwordgenDto.userId.toString()),
      investorEs = await this.investorEService.findOne(createwordgenDto.userId.toString()),
      bankinfos = await this.bankinfoService.findOne(createwordgenDto.userId.toString()),
      deposittypes = await this.deposittypeService.findOne(createwordgenDto.userId.toString()),
      advisers = await this.adviserService.findOne(createwordgenDto.userId.toString()),
      verifications = await this.verificationService.findOne(createwordgenDto.userId.toString()),
      fatcas = await this.fatcaService.findOne(createwordgenDto.userId.toString()),
      wholesales = await this.wholesaleService.findOne(createwordgenDto.userId.toString()),
      declarations = await this.declarationService.findOne(createwordgenDto.userId.toString());

      let genDocName = createwordgenDto.userId.toString() + '_' + investortypes.label + '.pdf',
      tempDocName = (fatcas && fatcas.isUscitizen == 'Yes') ? 'template_' + investortypes.label + '_FATCA_Y.docx' : 'template_' + investortypes.label + '_FATCA_N.docx';
    // tempDocName = 'template.docx'; // this is just one for test.


    let flatobj0 = flattenObject(contactdetails, 'contactdetails'),
      flatobj1 = flattenObject(investments, 'investments'),
      flatobj2 = flattenObject(investortypes, 'investortypes'),
      flatobj2A = flattenObject(investorAs, 'investorAs'),
      flatobj2B = flattenObject(investorBs, 'investorBs'),
      flatobj2C = flattenObject(investorCs, 'investorCs'),
      flatobj2D = flattenObject(investorDs, 'investorDs'),
      flatobj2E = flattenObject(investorEs, 'investorEs'),
      flatobj3 = flattenObject(bankinfos, 'bankinfos'),
      flatobj4 = flattenObject(deposittypes, 'deposittypes'),
      flatobj5 = flattenObject(advisers, 'advisers'),
      flatobj6 = flattenObject(verifications, 'verifications'),
      flatobj7 = flattenObject(fatcas, 'fatcas'),
      flatobj8 = flattenObject(wholesales, 'wholesales'),
      flatobj9 = flattenObject(declarations, 'declarations');

    let docxData = {
      ...flatobj0, ...flatobj1,
      ...flatobj2, ...flatobj3,
      ...flatobj4, ...flatobj5,
      ...flatobj6, ...flatobj7,
      ...flatobj8, ...flatobj9,
    };
    

    if(investortypes) {
      switch(investortypes.label) {
        case 'A & B':
          docxData = { ...docxData, ...flatobj2A, ...flatobj2B};
          break;
        case 'C & E':
          docxData = { ...docxData, ...flatobj2C, ...flatobj2E};
          break;
        case 'C':
          docxData = { ...docxData, ...flatobj2C};
          break;
        case 'C, D & E':
          docxData = { ...docxData, ...flatobj2C, ...flatobj2D, ...flatobj2E};
          break;
        case 'A, D & E':
          docxData = { ...docxData, ...flatobj2A, ...flatobj2D, ...flatobj2E};
          break;
        case 'C & D':
          docxData = { ...docxData, ...flatobj2C, ...flatobj2D};
          break;
        case 'A & D':
          docxData = { ...docxData, ...flatobj2A, ...flatobj2D};
          break;
        default:
          break;
      }
    }

    // console.log('^-^Before Create Content : ', investortypes);
    let user: any = await this.contactdetailService.findOne(createwordgenDto.userId.toString());
    // console.log('^-^UserInfo : ', user.userId);
    // Get the contents of the given docx file.
    let updatedcontent = await this.editWordDocument(tempDocName, docxData);
    createwordgenDto.orientation = await this.writeOutputFile(genDocName, updatedcontent, user.userId._doc);

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
      investorAs = await this.investorAService.findOne(updatewordgenDto.userId.toString()),
      investorBs = await this.investorBService.findOne(updatewordgenDto.userId.toString()),
      investorCs = await this.investorCService.findOne(updatewordgenDto.userId.toString()),
      investorDs = await this.investorDService.findOne(updatewordgenDto.userId.toString()),
      investorEs = await this.investorEService.findOne(updatewordgenDto.userId.toString()),
      bankinfos = await this.bankinfoService.findOne(updatewordgenDto.userId.toString()),
      deposittypes = await this.deposittypeService.findOne(updatewordgenDto.userId.toString()),
      advisers = await this.adviserService.findOne(updatewordgenDto.userId.toString()),
      verifications = await this.verificationService.findOne(updatewordgenDto.userId.toString()),
      fatcas = await this.fatcaService.findOne(updatewordgenDto.userId.toString()),
      wholesales = await this.wholesaleService.findOne(updatewordgenDto.userId.toString()),
      declarations = await this.declarationService.findOne(updatewordgenDto.userId.toString());

      let genDocName = updatewordgenDto.userId.toString() + '_' + investortypes.label + '.pdf',
      tempDocName = (fatcas && fatcas.isUscitizen == 'Yes') ? 'template_' + investortypes.label + '_FATCA_Y.docx' : 'template_' + investortypes.label + '_FATCA_N.docx';
    // tempDocName = 'template.docx'; // this is just one for test.


    let flatobj0 = flattenObject(updateContactdetail, 'contactdetails'),
      flatobj1 = flattenObject(investments, 'investments'),
      flatobj2 = flattenObject(investortypes, 'investortypes'),
      flatobj2A = flattenObject(investorAs, 'investorAs'),
      flatobj2B = flattenObject(investorBs, 'investorBs'),
      flatobj2C = flattenObject(investorCs, 'investorCs'),
      flatobj2D = flattenObject(investorDs, 'investorDs'),
      flatobj2E = flattenObject(investorEs, 'investorEs'),
      flatobj3 = flattenObject(bankinfos, 'bankinfos'),
      flatobj4 = flattenObject(deposittypes, 'deposittypes'),
      flatobj5 = flattenObject(advisers, 'advisers'),
      flatobj6 = flattenObject(verifications, 'verifications'),
      flatobj7 = flattenObject(fatcas, 'fatcas'),
      flatobj8 = flattenObject(wholesales, 'wholesales'),
      flatobj9 = flattenObject(declarations, 'declarations');

    let docxData = {
      ...flatobj0, ...flatobj1,
      ...flatobj2, ...flatobj3,
      ...flatobj4, ...flatobj5,
      ...flatobj6, ...flatobj7,
      ...flatobj8, ...flatobj9,
    };
    

    if(investortypes) {
      switch(investortypes.label) {
        case 'A & B':
          docxData = { ...docxData, ...flatobj2A, ...flatobj2B};
          break;
        case 'C & E':
          docxData = { ...docxData, ...flatobj2C, ...flatobj2E};
          break;
        case 'C':
          docxData = { ...docxData, ...flatobj2C};
          break;
        case 'C, D & E':
          docxData = { ...docxData, ...flatobj2C, ...flatobj2D, ...flatobj2E};
          break;
        case 'A, D & E':
          docxData = { ...docxData, ...flatobj2A, ...flatobj2D, ...flatobj2E};
          break;
        case 'C & D':
          docxData = { ...docxData, ...flatobj2C, ...flatobj2D};
          break;
        case 'A & D':
          docxData = { ...docxData, ...flatobj2A, ...flatobj2D};
          break;
        default:
          break;
      }
    }


    // console.log('^-^Before Create Content : ', investortypes);
    let user: any = await this.contactdetailService.findOne(updatewordgenDto.userId.toString());
    // console.log('^-^UserInfo : ', user.userId);

    let updatedcontent = await this.editWordDocument(tempDocName, docxData);

    updatewordgenDto.userId = new Types.ObjectId(updatewordgenDto.userId);

    updatewordgenDto.orientation = await this.writeOutputFile(genDocName, updatedcontent, user.userId._doc);

    this.wordgenModel.findByIdAndUpdate(id, updatewordgenDto).lean().exec();
    return updatewordgenDto.orientation;
  }

  async remove(id: string) {
    const objectId = new Types.ObjectId(id);
    return this.wordgenModel.findByIdAndRemove(objectId).lean().exec();
  }
}
