import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestorTypeService } from './investor-types.service';
import { CreateInvestorTypeDto } from './dto/create-investor-type.dto';
import { UpdateInvestorTypeDto } from './dto/update-investor-type.dto';

@Controller('investor-types')
export class InvestorTypesController {
  constructor(private readonly investorTypesService: InvestorTypeService) {}

  @Post()
  create(@Body() createInvestorTypeDto: CreateInvestorTypeDto) {
    return this.investorTypesService.create(createInvestorTypeDto);
  }

  @Get()
  findAll() {
    return this.investorTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvestorTypeDto: UpdateInvestorTypeDto) {
    return this.investorTypesService.update(+id, updateInvestorTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorTypesService.remove(+id);
  }
}
