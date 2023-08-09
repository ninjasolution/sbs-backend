import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestorCService } from './investor-c.service';
import { CreateInvestorCDto } from './dto/create-investor-c.dto';
import { UpdateInvestorCDto } from './dto/update-investor-c.dto';

@Controller('investor-c')
export class InvestorCController {
  constructor(private readonly investorCService: InvestorCService) {}

  @Post()
  create(@Body() createInvestorCDto: CreateInvestorCDto) {
    return this.investorCService.create(createInvestorCDto);
  }

  @Get()
  findAll() {
    return this.investorCService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorCService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvestorCDto: UpdateInvestorCDto) {
    return this.investorCService.update(+id, updateInvestorCDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorCService.remove(+id);
  }
}
