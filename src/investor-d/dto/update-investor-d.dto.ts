import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorDDto } from './create-investor-d.dto';

export class UpdateInvestorDDto extends PartialType(CreateInvestorDDto) {}
