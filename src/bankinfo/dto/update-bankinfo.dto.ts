import { PartialType } from '@nestjs/mapped-types';
import { CreateBankinfoDto } from './create-bankinfo.dto';

export class UpdateBankinfoDto extends PartialType(CreateBankinfoDto) {}
