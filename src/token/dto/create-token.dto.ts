import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTokenDto {
	@IsString()
	token: string;


	@IsOptional()
	@IsBoolean()
	active?: boolean;

	@IsOptional()
	@IsNumber()
	reqLeft?: number;
}
