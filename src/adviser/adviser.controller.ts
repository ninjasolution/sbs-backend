import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdviserService } from './adviser.service';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('adviser')
export class AdviserController {
  constructor(private readonly adviserService: AdviserService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  create(@Body() createAdviserDto: CreateAdviserDto) {
    return this.adviserService.create(createAdviserDto);
  }

  @Get()
  findAll() {
    return this.adviserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adviserService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  update(@Param('id') id: string, @Body() updateAdviserDto: UpdateAdviserDto) {
    return this.adviserService.update(id, updateAdviserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adviserService.remove(+id);
  }
}
