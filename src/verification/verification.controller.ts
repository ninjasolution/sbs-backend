import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, UploadedFiles } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

interface CustomRequest extends Request {
  files: any[];
}
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) { }

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  @UseInterceptors(FilesInterceptor('files', 2)) // Set limits to 2 files
  create(@Body() createVerificationDto: CreateVerificationDto, @UploadedFiles() files) {
    // console.log('^-^Files : ', files);
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        const { originalname, buffer, mime } = file;
        console.log('^-^File Name : ', originalname);
        const base64Data = buffer.toString('base64');
        // Split the src to separate the MIME type and base64 data

        // console.log('^-^Create Mime : ', mime);
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;
        if (index < 1) createVerificationDto.backScreen = dataUrl;
        else createVerificationDto.frontScreen = dataUrl;
      });
    }
    // console.log('^-^createVerificationDto.backScreen: ', createVerificationDto.backScreen);
    return this.verificationService.create(createVerificationDto);
  }

  @Get()
  findAll() {
    return this.verificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verificationService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  @UseInterceptors(FilesInterceptor('files', 2)) // Set limits to 2 files
  update(@Param('id') id: string, @Body() updateVerificationDto: UpdateVerificationDto, @UploadedFiles() files) {
    // console.log('^-^Files : ', files);
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        const { originalname, buffer } = file;
        console.log('^-^File Name : ', originalname);
        const base64Data = buffer.toString('base64');
        // Split the src to separate the MIME type and base64 data

        // console.log('^-^Update Mime : ', mime);
        // console.log('^-^File Source : ', base64Data);
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;
        if (index < 1) updateVerificationDto.backScreen = dataUrl;
        else updateVerificationDto.frontScreen = dataUrl;
      });
    }
    // console.log('^-^updateVerificationDto.backScreen: ', updateVerificationDto.backScreen);
    return this.verificationService.update(id, updateVerificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verificationService.remove(+id);
  }
}
