import { PartialType } from '@nestjs/mapped-types';
import { CreateApiKeyDto } from './create-api-key.dto';
import { IsBoolean } from 'class-validator';

export class UpdateApiKeyDto extends PartialType(CreateApiKeyDto) {

    @IsBoolean()
    isActive?: boolean;

}
