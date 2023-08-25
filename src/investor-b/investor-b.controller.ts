import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestorBService } from './investor-b.service';
import { CreateInvestorBDto } from './dto/create-investor-b.dto';
import { UpdateInvestorBDto } from './dto/update-investor-b.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('investor-b')
export class InvestorBController {
  constructor(private readonly investorBService: InvestorBService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  create(@Body() createInvestorBDto: CreateInvestorBDto) {
    return this.investorBService.create(createInvestorBDto);
  }

  @Get()
  findAll() {
    return this.investorBService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorBService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  update(@Param('id') id: string, @Body() updateInvestorBDto: UpdateInvestorBDto) {
    return this.investorBService.update(id, updateInvestorBDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorBService.remove(+id);
  }
}
