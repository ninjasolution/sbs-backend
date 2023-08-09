import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FatcaService } from './fatca.service';
import { CreateFatcaDto } from './dto/create-fatca.dto';
import { UpdateFatcaDto } from './dto/update-fatca.dto';

@Controller('fatca')
export class FatcaController {
  constructor(private readonly fatcaService: FatcaService) {}

  @Post()
  create(@Body() createFatcaDto: CreateFatcaDto) {
    return this.fatcaService.create(createFatcaDto);
  }

  @Get()
  findAll() {
    return this.fatcaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fatcaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFatcaDto: UpdateFatcaDto) {
    return this.fatcaService.update(+id, updateFatcaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fatcaService.remove(+id);
  }
}
