import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WholesaleService } from './wholesale.service';
import { CreateWholesaleDto } from './dto/create-wholesale.dto';
import { UpdateWholesaleDto } from './dto/update-wholesale.dto';

@Controller('wholesale')
export class WholesaleController {
  constructor(private readonly wholesaleService: WholesaleService) {}

  @Post()
  create(@Body() createWholesaleDto: CreateWholesaleDto) {
    return this.wholesaleService.create(createWholesaleDto);
  }

  @Get()
  findAll() {
    return this.wholesaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wholesaleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWholesaleDto: UpdateWholesaleDto) {
    return this.wholesaleService.update(+id, updateWholesaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wholesaleService.remove(+id);
  }
}
