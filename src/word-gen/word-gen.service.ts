import { Body, Injectable } from '@nestjs/common';
import { CreateWordGenDto } from './dto/create-word-gen.dto';
import { UpdateWordGenDto } from './dto/update-word-gen.dto';
import fs from 'fs';

import Docxtemplater from 'docxtemplater';
import HtmlToReact from 'html-to-react';
import { transform } from 'inline-style-parser';
import * as mammoth from 'mammoth';
import { readFile } from 'fs/promises';
import * as htmlDocx from 'html-docx-js';
import { HtmlToDocx } from 'html-to-docx';

@Injectable()
export class WordGenService {
  async readDocxFile(filePath: string): Promise<string> {
    const fileData = await readFile(filePath);
    const result = await mammoth.extractRawText({ buffer: fileData });
    return result.value;
  }
  async generateDocxFromHtml(html: string, outputPath: string): Promise<void> {
    const converter = new HtmlToDocx();

    const fileContentBuffer = await converter.parseHtml(html);
    const fileContent = await converter.getFullXml(fileContentBuffer);

    fs.writeFileSync(outputPath, fileContent, { encoding: 'binary' });
  }
  create(@Body() formData) {
    return new Promise<void>((resolve, reject) => {
      console.log('^-^ formData: ', formData);    
      // const reactParser = HtmlToReact.Parser();
      // const reactComponent = reactParser.parse(formData);

  
      // Transform the styles in the HTML into inline styles
      // const htmlWithInlineStyles = transform(formData);
      // console.log('^-^htmlWithInlineStyles content: ', htmlWithInlineStyles);
  
      // const content = fs.readFileSync('template.docx', 'utf-8');
      // console.log('^-^tamplate Doc file content : ', content);

      this.readDocxFile('template.docx').then(result => {
        console.log('^-^tamplate Doc file content : ', result);
        const fileContent = htmlDocx.asBlob(formData); // Convert HTML to DOCX format
        // const doc: Docxtemplater  = new Docxtemplater(result);
        // console.log('^-^tamplate Doc: ', doc);
  
        // // Set the transformed HTML with inline styles as the content to populate the template
        // doc.setData({ result: reactComponent });
    
        // try {
        //   doc.render();
        // } catch (error) {
        //   console.error(':( ', error);
        //   reject(error);
        //   return;
        // }
    
        // const buf = doc.getZip().generate({ type: 'nodebuffer' });
        fs.writeFileSync('output.docx', fileContent);
      })
      .catch ((error) => {
        console.error(':( ', error);
        reject(error);
        return;
      });
  
      resolve();
    });
  }

  findAll() {
    return `This action returns all wordGen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wordGen`;
  }

  update(id: number, updateWordGenDto: UpdateWordGenDto) {
    return `This action updates a #${id} wordGen`;
  }

  remove(id: number) {
    return `This action removes a #${id} wordGen`;
  }
}
