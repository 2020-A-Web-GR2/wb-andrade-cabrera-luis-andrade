import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query, Req, Res,
} from '@nestjs/common';
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";
// http://localhost:3001/juegos-http
// @Controller('')
@Controller('juegos-http')
export class HttpJuegoController{
  @Get('hola')
  @HttpCode(201)
  holaGet(){
    throw new BadRequestException('No envía nada')
    //return "Hola Mundo Web GET ^_^"
  }
  @Post('hola')
  @HttpCode(202)
  holaPost(){
    return "Hola Mundo Web POST ^_^"
  }
  @Delete('hola')
  @HttpCode(204)
  @Header('Cache-control', 'none')
  @Header('EPN', 'probando las cosas')
  holaDelete(){
    return "Hola Mundo Web DELETE ^_^"
  }

  // http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
  @Get('/parametros-ruta/:edad/gestion/:altura')
  parametrosRutaEjemplo(
    @Param() parametrosRuta
  ){
    console.log('Parametros', parametrosRuta);
    //Validar que es un número
    //isNaN(parametrosRuta.edad) // 'ABC' true
    //isNaN(parametrosRuta.edad) // 1234 false
    if (isNaN(parametrosRuta.edad) || isNaN(parametrosRuta.altura)){
      throw new BadRequestException('No son números')
    } else{
      const edad = Number(parametrosRuta.edad);
      const altura = Number(parametrosRuta.altura);
      return edad + altura;
    }
  }
  @Get('parametros-consulta')
  parametrosConsulta(
      @Query() parametrosDeConsulta
  ){
    console.log('parametrosDeConsulta', parametrosDeConsulta);
    //El profesor usa código limpio así que se creará una variable para almacenar el valor booleano
    const tieneNombreApellido = parametrosDeConsulta.nombre && parametrosDeConsulta.apellido
    if (tieneNombreApellido){
      //return 'Nombre:'+ parametrosDeConsulta.nombre + ' Apellido:'+ parametrosDeConsulta.apellido;
      return parametrosDeConsulta.nombre + ' '+ parametrosDeConsulta.apellido;
    }
    return '^.^';
  }

  @Post('parametros-cuerpo')
  async parametrosCuerpo(
      @Body() parametrosDeCuerpo
  ) {
    const mascotaValida = new MascotaCreateDto();
    mascotaValida.casada = parametrosDeCuerpo.casada;
    mascotaValida.edad = parametrosDeCuerpo.edad;
    mascotaValida.ligada = parametrosDeCuerpo.ligada;
    mascotaValida.nombre = parametrosDeCuerpo.nombre;
    mascotaValida.peso = parametrosDeCuerpo.peso;
    try {
      const errores: ValidationError[] = await validate(mascotaValida);
      if (errores.length > 0) {
        console.log("Errores", errores);
        throw new BadRequestException("Error validando");
      } else {
        return {
          mensaje: "Se creo correctamente"
        };
      }
    } catch (e) {
      console.error("Error", e);
      throw new BadRequestException("Error validando")
    }
  }

  @Get('guardarCookieInsegura')
  guardarCookieInsegura(
      @Query() parametrosConsulta,
      @Req() req,
      @Res() res
  ){
    res.cookie(
        'galletaInsegura', // nombre
        'Tengo Hambre', // valor
    );

    res.send({
      mensaje: 'ok'
    });
  }
}