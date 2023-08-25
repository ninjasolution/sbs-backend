import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestorDService } from './investor-d.service';
import { CreateInvestorDDto } from './dto/create-investor-d.dto';
import { UpdateInvestorDDto } from './dto/update-investor-d.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('investor-d')
export class InvestorDController {
  constructor(private readonly investorDService: InvestorDService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  create(@Body() createInvestorDDto: CreateInvestorDDto) {
    return this.investorDService.create(createInvestorDDto);
  }

  @Get()
  findAll() {
    return this.investorDService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorDService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  update(@Param('id') id: string, @Body() updateInvestorDDto: UpdateInvestorDDto) {
    return this.investorDService.update(id, updateInvestorDDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorDService.remove(+id);
  }
}
