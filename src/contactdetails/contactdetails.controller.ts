import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactdetailsService } from './contactdetails.service';
import { CreateContactdetailDto } from './dto/create-contactdetail.dto';
import { UpdateContactdetailDto } from './dto/update-contactdetail.dto';

@Controller('contactdetails')
export class ContactdetailsController {
  constructor(private readonly contactdetailsService: ContactdetailsService) {}

  @Post()
  create(@Body() createContactdetailDto: CreateContactdetailDto) {
    return this.contactdetailsService.create(createContactdetailDto);
  }

  @Get()
  findAll() {
    return this.contactdetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactdetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactdetailDto: UpdateContactdetailDto) {
    return this.contactdetailsService.update(+id, updateContactdetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactdetailsService.remove(+id);
  }
}
