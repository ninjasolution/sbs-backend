import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorEDto } from './create-investor-e.dto';

export class UpdateInvestorEDto extends PartialType(CreateInvestorEDto) {}
