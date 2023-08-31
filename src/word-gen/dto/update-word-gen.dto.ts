import { PartialType } from '@nestjs/swagger';
import { CreateWordGenDto } from './create-word-gen.dto';

export class UpdateWordGenDto extends PartialType(CreateWordGenDto) {}
