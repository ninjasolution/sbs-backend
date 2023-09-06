import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { WordGenService } from './word-gen.service';
import { CreateWordGenDto } from './dto/create-word-gen.dto';
import { UpdateWordGenDto } from './dto/update-word-gen.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
const fs = require('fs');
const { Docxtemplater } = require('docxtemplater');
import { Response } from 'express';

@Controller('word-gen')
export class WordGenController {
  constructor(private readonly wordGenService: WordGenService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  async create(@Body() createWordGenDto) {
    return this.wordGenService.create(createWordGenDto);
  }

  @Get()
  findAll() {
    return this.wordGenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordGenService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  async update(@Param('id') id: string, @Body() updateWordGenDto: UpdateWordGenDto, @Res() res: Response) {
    const fileData = await this.wordGenService.update(id, updateWordGenDto);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename="file.docx"');
    console.log('^-^File Data: ', fileData);
    res.send("https://gateway.pinata.cloud/ipfs/"+fileData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordGenService.remove(id);
  }
}
