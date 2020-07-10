// @IsAlpha()
// IsNotEmpty()
// MinLength()
// MaxLength()
// IsBoolean()
// IsEmpty()
import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class MascotaCreateDto{

    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @IsNotEmpty()
    @IsInt()
    @IsNumber()
    @IsPositive()
    edad: number; // enteros

    @IsNotEmpty()
    @IsBoolean()
    casada: boolean;

    @IsBoolean()
    @IsOptional()
    ligada?: boolean;

    @IsNotEmpty()
    @IsPositive()
    @IsPositive()
    peso: number; // decimales
}