import { IsString } from "class-validator";

export class CreateProfesorDto {

    @IsString()
    nombre: string


    
}

