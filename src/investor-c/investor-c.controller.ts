import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestorCService } from './investor-c.service';
import { CreateInvestorCDto } from './dto/create-investor-c.dto';
import { UpdateInvestorCDto } from './dto/update-investor-c.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('investor-c')
export class InvestorCController {
  constructor(private readonly investorCService: InvestorCService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  create(@Body() createInvestorCDto: CreateInvestorCDto) {
    return this.investorCService.create(createInvestorCDto);
  }

  @Get()
  findAll() {
    return this.investorCService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorCService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  update(@Param('id') id: string, @Body() updateInvestorCDto: UpdateInvestorCDto) {
    return this.investorCService.update(id, updateInvestorCDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorCService.remove(+id);
  }
}
