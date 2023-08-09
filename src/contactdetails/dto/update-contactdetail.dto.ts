import { PartialType } from '@nestjs/mapped-types';
import { CreateContactdetailDto } from './create-contactdetail.dto';

export class UpdateContactdetailDto extends PartialType(CreateContactdetailDto) {}
