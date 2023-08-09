import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorBDto } from './create-investor-b.dto';

export class UpdateInvestorBDto extends PartialType(CreateInvestorBDto) {}
