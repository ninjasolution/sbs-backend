import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorCDto } from './create-investor-c.dto';

export class UpdateInvestorCDto extends PartialType(CreateInvestorCDto) {}
