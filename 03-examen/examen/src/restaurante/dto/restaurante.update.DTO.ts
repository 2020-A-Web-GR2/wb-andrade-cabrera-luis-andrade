import {IsEmpty, IsNotEmpty, IsOptional, IsPhoneNumber, Length, MinLength} from "class-validator";

export class RestauranteUpdateDTO {
    @IsNotEmpty()
    @MinLength(3)
    nombre: string;

    @IsOptional()
    ruc: string;

    @IsNotEmpty()
    @MinLength(3)
    categoria: string;

    @IsNotEmpty()
    @MinLength(3)
    ubicacion: string;

    @IsPhoneNumber("null")
    telefono: string;

    @IsOptional()
    @MinLength(3)
    tipoComida: string;
}