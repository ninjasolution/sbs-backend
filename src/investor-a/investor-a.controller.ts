import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestorAService } from './investor-a.service';
import { CreateInvestorADto } from './dto/create-investor-a.dto';
import { UpdateInvestorADto } from './dto/update-investor-a.dto';

@Controller('investor-a')
export class InvestorAController {
  constructor(private readonly investorAService: InvestorAService) {}

  @Post()
  create(@Body() createInvestorADto: CreateInvestorADto) {
    return this.investorAService.create(createInvestorADto);
  }

  @Get()
  findAll() {
    return this.investorAService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorAService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvestorADto: UpdateInvestorADto) {
    return this.investorAService.update(+id, updateInvestorADto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorAService.remove(+id);
  }
}
