import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import { UpdateDeclarationDto } from './dto/update-declaration.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('declaration')
export class DeclarationController {
  constructor(private readonly declarationService: DeclarationService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  create(@Body() createDeclarationDto: CreateDeclarationDto) {
    console.log('^-^Creating declaration : ', createDeclarationDto);
    return this.declarationService.create(createDeclarationDto);
  }

  @Get()
  findAll() {
    return this.declarationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.declarationService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  update(@Param('id') id: string, @Body() updateDeclarationDto: UpdateDeclarationDto) {
    return this.declarationService.update(id, updateDeclarationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.declarationService.remove(+id);
  }
}
