import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { WordGenService } from './word-gen.service';
import { CreateWordGenDto } from './dto/create-word-gen.dto';
import { UpdateWordGenDto } from './dto/update-word-gen.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
const fs = require('fs');
const { Docxtemplater } = require('docxtemplater');

@Controller('word-gen')
export class WordGenController {
  constructor(private readonly wordGenService: WordGenService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() formData, @Res() response, @UploadedFile() file) {
    // return this.wordGenService.create(createWordGenDto);
    // const { styledHTML } = body;
    console.log('^-^Controller file: ', file);
    try {
      let retVal = await this.wordGenService.create(formData);
      console.log('^-^WordGen return value: ', retVal);
      // Send the generated DOCX file as a response
      response.download('output.docx');
    } catch (error) {
      response.status(500).json({ message: 'Error generating DOCX', error });
    }

  }

  @Get()
  findAll() {
    return this.wordGenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordGenService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  update(@Param('id') id: string, @Body() updateWordGenDto: UpdateWordGenDto) {
    return this.wordGenService.update(+id, updateWordGenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordGenService.remove(+id);
  }
}
