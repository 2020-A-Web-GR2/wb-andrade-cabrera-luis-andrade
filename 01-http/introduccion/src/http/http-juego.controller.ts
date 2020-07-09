import {BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Query} from '@nestjs/common';
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
  parametrosCuerpo(
      @Body() parametrosDeCuerpo
  ){
    console.log('Parametros de cuerpo', parametrosDeCuerpo)
    return 'Registro Creado'
  }
}