import { PartialType } from '@nestjs/mapped-types';
import { CreateFatcaDto } from './create-fatca.dto';

export class UpdateFatcaDto extends PartialType(CreateFatcaDto) {}
