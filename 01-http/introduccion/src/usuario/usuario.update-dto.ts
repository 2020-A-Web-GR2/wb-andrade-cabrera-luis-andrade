import {IsAlpha, IsEmpty, IsNotEmpty, IsNumber, Length, MaxLength, Min, MinLength} from "class-validator";

export class UsuarioUpdateDto {
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    apellido: string;

    @IsEmpty()
    @IsNumber()
    @Length(10,10)
    cedula: string;

    @IsNumber()
    sueldo: string;

    @MinLength(6)
    fechaNacimiento: string;

    @MinLength(6)
    fechaHoraNacimiento: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    id:number;
}