import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestorEService } from './investor-e.service';
import { CreateInvestorEDto } from './dto/create-investor-e.dto';
import { UpdateInvestorEDto } from './dto/update-investor-e.dto';

@Controller('investor-e')
export class InvestorEController {
  constructor(private readonly investorEService: InvestorEService) {}

  @Post()
  create(@Body() createInvestorEDto: CreateInvestorEDto) {
    return this.investorEService.create(createInvestorEDto);
  }

  @Get()
  findAll() {
    return this.investorEService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorEService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvestorEDto: UpdateInvestorEDto) {
    return this.investorEService.update(+id, updateInvestorEDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorEService.remove(+id);
  }
}
