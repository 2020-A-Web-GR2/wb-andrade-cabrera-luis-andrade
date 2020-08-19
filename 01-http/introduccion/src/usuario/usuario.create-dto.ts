import {IsAlpha, IsNotEmpty, IsNumber, Length, MaxLength, MinLength} from "class-validator";

export class UsuarioCreateDto {

    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    apellido: string;

    @IsNotEmpty()
    @IsNumber()
    @Length(10,10)
    cedula: string;

    @IsNumber()
    sueldo: string;

    @MinLength(6)
    fechaNacimiento: string;

    @MinLength(6)
    fechaHoraNacimiento: string;

}