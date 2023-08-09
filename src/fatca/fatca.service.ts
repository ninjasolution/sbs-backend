import { Injectable } from '@nestjs/common';
import { CreateFatcaDto } from './dto/create-fatca.dto';
import { UpdateFatcaDto } from './dto/update-fatca.dto';

@Injectable()
export class FatcaService {
  create(createFatcaDto: CreateFatcaDto) {
    return 'This action adds a new fatca';
  }

  findAll() {
    return `This action returns all fatca`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fatca`;
  }

  update(id: number, updateFatcaDto: UpdateFatcaDto) {
    return `This action updates a #${id} fatca`;
  }

  remove(id: number) {
    return `This action removes a #${id} fatca`;
  }
}
