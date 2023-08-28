import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BankinfoService } from './bankinfo.service';
import { CreateBankinfoDto } from './dto/create-bankinfo.dto';
import { UpdateBankinfoDto } from './dto/update-bankinfo.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('bankinfo')
export class BankinfoController {
  constructor(private readonly bankinfoService: BankinfoService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  create(@Body() createBankinfoDto: CreateBankinfoDto) {
    return this.bankinfoService.create(createBankinfoDto);
  }

  @Get()
  findAll() {
    return this.bankinfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankinfoService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.'
  })
  update(@Param('id') id: string, @Body() updateBankinfoDto: UpdateBankinfoDto) {
    return this.bankinfoService.update(id, updateBankinfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankinfoService.remove(+id);
  }
}
