import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeposittypeService } from './deposittype.service';
import { CreateDeposittypeDto } from './dto/create-deposittype.dto';
import { UpdateDeposittypeDto } from './dto/update-deposittype.dto';

@Controller('deposittype')
export class DeposittypeController {
  constructor(private readonly deposittypeService: DeposittypeService) {}

  @Post()
  create(@Body() createDeposittypeDto: CreateDeposittypeDto) {
    return this.deposittypeService.create(createDeposittypeDto);
  }

  @Get()
  findAll() {
    return this.deposittypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deposittypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeposittypeDto: UpdateDeposittypeDto) {
    return this.deposittypeService.update(+id, updateDeposittypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deposittypeService.remove(+id);
  }
}
