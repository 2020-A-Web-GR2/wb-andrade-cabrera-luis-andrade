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
import {usuarioCalculadoraCreateDto} from "./dto/usuario-calculadora.create-dto";
import {validate, ValidationError} from "class-validator";

@Controller('calculadora')
export class HttpCalculadoraController{
    @Get("sumar")
    @HttpCode(200)
    suma(
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ){
        if (req.cookies.nombre){
            console.log("parametrosDeconsulta", parametrosDeConsulta)
            const secondArgumenbtExists = parametrosDeConsulta.n2
            const argumentosValidos = isNaN(parametrosDeConsulta.n1) || isNaN(parametrosDeConsulta.n2)
            if (argumentosValidos){
                throw new BadRequestException('n1 y n2 deben ser números')
            } else{
                const n1 = Number(parametrosDeConsulta.n1);
                const n2 = Number(parametrosDeConsulta.n2);
                const resultado = n1 + n2
                const puntaje = req.signedCookies.puntaje - Math.abs(resultado)
                const usuario = req.cookies.nombre.toString()
                console.log(puntaje)
                this.enviarRespuesta(n1, n2, "+",resultado, puntaje, usuario, res)
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
        @Req() req,
        @Res() res
    ){
        if(req.cookies.nombre){
            console.log("Primer Argumento", primerArgumento)
            console.log("Segundo Argumento", segundoArgumento)
            const secondArgumenbtExists = segundoArgumento.n2
            const argumentosValidos = isNaN(primerArgumento.n1) || isNaN(segundoArgumento.n2)
            if (argumentosValidos){
                throw new BadRequestException('n1 y n2 deben ser números')
            } else{
                const n1 = Number(primerArgumento.n1);
                const n2 = Number(segundoArgumento.n2);
                const resultado = n1 - n2
                const puntaje = req.signedCookies.puntaje - Math.abs(resultado)
                const usuario = req.cookies.nombre.toString()
                console.log(puntaje)
                this.enviarRespuesta(n1, n2, "-",resultado, puntaje, usuario, res)
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
        @Req() req,
        @Res() res
    ){
        if (req.cookies.nombre){
            console.log("Primer Argumento", primerArgumento)
            console.log("Segundo Argumento", segundoArgumento)
            const secondArgumenbtExists = segundoArgumento.n2
            const argumentosValidos = isNaN(primerArgumento.n1) || isNaN(segundoArgumento.n2)
            if (argumentosValidos){
                throw new BadRequestException('n1 y n2 deben ser números')
            } else{
                const n1 = Number(primerArgumento.n1);
                const n2 = Number(segundoArgumento.n2);
                const resultado = n1 * n2
                const puntaje = req.signedCookies.puntaje - Math.abs(resultado)
                const usuario = req.cookies.nombre.toString()
                console.log(puntaje)
                this.enviarRespuesta(n1, n2, "*",resultado, puntaje, usuario, res)
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
        @Req() req,
        @Res() res
    ){
        if(req.cookies.nombre){
            console.log("ParametrosRuta", parametrosRuta)
            //console.log("Segundo Argumento", segundoArgumento)
            const secondArgumentExists = parametrosRuta.n2
            const argumentosValidos = isNaN(parametrosRuta.n1) || isNaN(parametrosRuta.n2)
            if (argumentosValidos){
                throw new BadRequestException('n1 y n2 deben ser números')
            } else{
                const n1 = Number(parametrosRuta.n1);
                const n2 = Number(parametrosRuta.n2);
                if (n2 == 0){
                    throw new BadRequestException('El segundo argumento debe ser diferente de 0')
                } else{
                    const resultado = n1 / n2
                    const puntaje = req.signedCookies.puntaje - Math.abs(resultado)
                    const usuario = req.cookies.nombre.toString()
                    console.log(puntaje)
                    this.enviarRespuesta(n1, n2, "/",resultado, puntaje, usuario, res)
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
        const usuarioValidado = new usuarioCalculadoraCreateDto();
        usuarioValidado.nombre = parametrosDeConsulta.nombre;
        try {
            const errores: ValidationError[] = await validate(usuarioValidado);
            if (errores.length > 0) {
                console.log("Errores", errores);
                throw new BadRequestException("Nombre no válido");
            } else {
                res.cookie("nombre", parametrosDeConsulta.nombre)
                res.cookie(
                    "puntaje",100,
                    {
                        signed: true
                    },
                )
                res.send({
                    mensaje: "Usuario "+ parametrosDeConsulta.nombre +" Guardado",
                    puntaje: "Su puntaje empezará en 100"
                })
            }
        } catch (e) {
            console.error("Error", e);
            throw new BadRequestException("Nombre no válido")
        }
    }
    enviarRespuesta(n1, n2, operador, resultado, puntaje,usuario, res){
        if(puntaje<=0){
            res.cookie("puntaje",100,{signed: true},
            )
            res.send({
                resultado: n1.toString() + " " + operador + " " + n2.toString() + "= " + resultado.toString(),
                mensaje: usuario +", haz terminado tus puntos, se te han restablecido de nuevo"
            })
        }else{
            res.cookie('puntaje',puntaje,{signed:true});
            res.send({
                resultado: n1.toString() + " " + operador + " " + n2.toString() + " = " + resultado.toString(),
                mensaje: "Su puntaje es: " + puntaje.toString()
            })
        }
    }
}
