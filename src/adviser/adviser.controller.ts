import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdviserService } from './adviser.service';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';

@Controller('adviser')
export class AdviserController {
  constructor(private readonly adviserService: AdviserService) {}

  @Post()
  create(@Body() createAdviserDto: CreateAdviserDto) {
    return this.adviserService.create(createAdviserDto);
  }

  @Get()
  findAll() {
    return this.adviserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adviserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdviserDto: UpdateAdviserDto) {
    return this.adviserService.update(+id, updateAdviserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adviserService.remove(+id);
  }
}
