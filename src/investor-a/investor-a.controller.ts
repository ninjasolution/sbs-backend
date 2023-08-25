import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestorAService } from './investor-a.service';
import { CreateInvestorADto } from './dto/create-investor-a.dto';
import { UpdateInvestorADto } from './dto/update-investor-a.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('investor-a')
export class InvestorAController {
  constructor(private readonly investorAService: InvestorAService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  create(@Body() createInvestorADto: CreateInvestorADto) {
    return this.investorAService.create(createInvestorADto);
  }

  @Get()
  findAll() {
    return this.investorAService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorAService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  update(@Param('id') id: string, @Body() updateInvestorADto: UpdateInvestorADto) {
    return this.investorAService.update(id, updateInvestorADto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorAService.remove(+id);
  }
}
