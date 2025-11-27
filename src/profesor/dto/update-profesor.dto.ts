import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesorDto } from './create-profesor.dto';
import { IsBoolean } from 'class-validator';

export class UpdateProfesorDto extends PartialType(CreateProfesorDto) 
{

}
