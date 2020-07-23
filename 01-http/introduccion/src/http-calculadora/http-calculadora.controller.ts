import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Put,
    Query,
    Headers,
    Post,
    Param, Req, Res
} from "@nestjs/common";
import {HttpErrorByCode} from "@nestjs/common/utils/http-error-by-code.util";
import {MascotaCreateDto} from "../http/dto/mascota.create-dto";
import {usuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";

@Controller('calculadora')
export class HttpCalculadoraController{
    @Get("sumar")
    @HttpCode(200)
    suma(
        @Query() parametrosDeConsulta,
        @Req() req
    ){
        if (req.cookies.nombre){
            console.log("parametrosDeconsulta", parametrosDeConsulta)
            const secondArgumenbtExists = parametrosDeConsulta.n2
            const argumentosValidos = isNaN(parametrosDeConsulta.n1)
            if (argumentosValidos && !secondArgumenbtExists){
                throw new BadRequestException('No son números')
            } else{
                const n1 = Number(parametrosDeConsulta.n1);
                const n2 = Number(parametrosDeConsulta.n2);
                return n1 + n2;
            }
        }
        else{
            throw new BadRequestException('No existe cookie')
        }

    }

    @Put("restar")
    @HttpCode(201)
    resta(
        @Query() segundoArgumento,
        @Body() primerArgumento,
        @Req() req
    ){
        if(req.cookies.nombre){
            console.log("Primer Argumento", primerArgumento)
            console.log("Segundo Argumento", segundoArgumento)
            const secondArgumenbtExists = segundoArgumento.n2
            const argumentosValidos = isNaN(primerArgumento.n1)
            if (argumentosValidos && !secondArgumenbtExists){
                throw new BadRequestException('No son números')
            } else{
                const n1 = Number(primerArgumento.n1);
                const n2 = Number(segundoArgumento.n2);
                return n1 - n2;
            }
        }
        else{
            throw new BadRequestException('No existe cookie')
        }

    }

    //Headers desde postman y query desde params
    @Delete("multiplicacion")
    @HttpCode(200)
    multiplicacion(
        @Headers() primerArgumento,
        @Query() segundoArgumento,
        @Req() req
    ){
        if (req.cookies.nombre){
            console.log("Primer Argumento", primerArgumento)
            console.log("Segundo Argumento", segundoArgumento)
            const secondArgumenbtExists = segundoArgumento.n2
            const argumentosValidos = isNaN(primerArgumento.n1)
            if (argumentosValidos && !secondArgumenbtExists){
                throw new BadRequestException('No son números')
            } else{
                const n1 = Number(primerArgumento.n1);
                const n2 = Number(segundoArgumento.n2);
                return n1 * n2;
            }
        }
        else{
            throw new BadRequestException('No existe cookie')
        }

    }

    @Post("division/:n1/n2/:n2")
    @HttpCode(200)
    division(
        @Param() parametrosRuta,
        @Req() req
    ){
        if(req.cookies.nombre){
            console.log("ParametrosRuta", parametrosRuta)
            //console.log("Segundo Argumento", segundoArgumento)
            const secondArgumentExists = parametrosRuta.n2
            const argumentosValidos = isNaN(parametrosRuta.n1)
            if (argumentosValidos && !secondArgumentExists){
                throw new BadRequestException('No son números')
            } else{
                const n1 = Number(parametrosRuta.n1);
                const n2 = Number(parametrosRuta.n2);
                if (n2 == 0){
                    throw new BadRequestException('El segundo argumento debe ser diferente de 0')
                } else{
                    return n1 / n2;
                }
            }
        }
        else{
            throw new BadRequestException('No existe cookie')
        }
    }
    @Get("guardar")
    async guardar(
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ) {
        console.log("parametrosDeconsulta", parametrosDeConsulta)
        const usuarioValidado = new usuarioCreateDto();
        usuarioValidado.nombre = parametrosDeConsulta.nombre;
        try {
            const errores: ValidationError[] = await validate(usuarioValidado);
            if (errores.length > 0) {
                console.log("Errores", errores);
                throw new BadRequestException("Nombre no válido");
            } else {
                res.cookie("nombre", parametrosDeConsulta.nombre)
                res.send({
                    mensaje: "Usuario Guardado"
                })
            }
        } catch (e) {
            console.error("Error", e);
            throw new BadRequestException("Nombre no válido")
        }
    }
}
