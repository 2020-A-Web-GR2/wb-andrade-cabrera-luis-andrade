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

export class usuarioCreateDto{

    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;
}

