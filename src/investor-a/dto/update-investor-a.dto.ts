import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorADto } from './create-investor-a.dto';

export class UpdateInvestorADto extends PartialType(CreateInvestorADto) {}
