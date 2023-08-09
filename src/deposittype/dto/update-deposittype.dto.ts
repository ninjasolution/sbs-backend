import { PartialType } from '@nestjs/mapped-types';
import { CreateDeposittypeDto } from './create-deposittype.dto';

export class UpdateDeposittypeDto extends PartialType(CreateDeposittypeDto) {}
