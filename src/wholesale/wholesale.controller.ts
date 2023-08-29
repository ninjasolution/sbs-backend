import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WholesaleService } from './wholesale.service';
import { CreateWholesaleDto } from './dto/create-wholesale.dto';
import { UpdateWholesaleDto } from './dto/update-wholesale.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('wholesale')
export class WholesaleController {
  constructor(private readonly wholesaleService: WholesaleService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  create(@Body() createWholesaleDto: CreateWholesaleDto) {
    return this.wholesaleService.create(createWholesaleDto);
  }

  @Get()
  findAll() {
    return this.wholesaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wholesaleService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  update(@Param('id') id: string, @Body() updateWholesaleDto: UpdateWholesaleDto) {
    return this.wholesaleService.update(id, updateWholesaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wholesaleService.remove(+id);
  }
}
