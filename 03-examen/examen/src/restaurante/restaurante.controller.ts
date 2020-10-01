import {
     BadRequestException,
     Body,
     Controller,
     Get,
     InternalServerErrorException,
     NotFoundException, Param,
     Post,
     Query,
     Res, Session
} from "@nestjs/common";
import {RestauranteService} from "./restaurante.service";
import {RestauranteCreateDTO} from "./dto/restaurante.create.DTO";
import {validate, ValidationError} from "class-validator";
import {RestauranteUpdateDTO} from "./dto/restaurante.update.DTO";
import {RestauranteEntity} from "./restaurante.entity";

@Controller("restaurante")
export class RestauranteController {
     constructor(
         private readonly _restauranteService: RestauranteService
     ) {
     }
     @Get("inicio")
     async vistaInicio(
         @Query() parametrosConsulta,
         @Res() res,
         @Session() session
     ){
          const estaLogueado = session.usuario;
          if(!estaLogueado){
               return res.redirect("/login")
          }
          let resultadoEncontrado
          let busqueda = ""
          const existeBusqueda = typeof parametrosConsulta.busqueda!= "undefined"
          if(existeBusqueda){
               busqueda = parametrosConsulta.busqueda
          }
          try{
               resultadoEncontrado = await this._restauranteService.buscarTodos(busqueda)
          }catch (error) {
               throw new InternalServerErrorException("Error encontrado restaurantes")
          }
          if(resultadoEncontrado){
               res.render(
                   "restaurantes/restaurante",
                   {
                        arregloRestaurantes: resultadoEncontrado,
                        parametrosConsulta: parametrosConsulta
                   }
               )
          }else{
               throw new NotFoundException("No se encontraron restaurantes")
          }
     }

     @Get("crear")
     vistaCrear(
         @Query() parametrosConsulta,
         @Res() res,
         @Session() session
     ){
          const estaLogueado = session.usuario;
          if(!estaLogueado){
               return res.redirect("/login")
          }
          res.render(
              "restaurantes/crear-restaurante",
              {
                   error: parametrosConsulta.error,
                   nombre: parametrosConsulta.nombre,
                   ruc: parametrosConsulta.ruc,
                   categoria: parametrosConsulta.categoria,
                   ubicacion: parametrosConsulta.ubicacion,
                   telefono: parametrosConsulta.telefono,
                   tipoComida: parametrosConsulta.tipoComida
              }
          )
     }

     @Post("crearDesdeVista")
     async crearDesdeVista(
         @Body() parametrosCuerpo,
         @Res() res
     ){
          const restauranteValidado = new RestauranteCreateDTO();
          restauranteValidado.nombre = parametrosCuerpo.nombre;
          restauranteValidado.categoria = parametrosCuerpo.categoria;
          restauranteValidado.ruc = parametrosCuerpo.ruc;
          restauranteValidado.ubicacion = parametrosCuerpo.ubicacion;
          restauranteValidado.telefono = parametrosCuerpo.telefono;
          restauranteValidado.tipoComida = restauranteValidado.tipoComida;

          let nombreConsulta, categoriaConsulta, rucConsulta, ubicacionConsulta, telefonoConsulta, tipoComidaConsulta;
          try {
               const errores: ValidationError[] = await validate(restauranteValidado);
               if (errores.length > 0){
                    console.log("Errores", errores)
                    nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                    categoriaConsulta = `&categoria=${parametrosCuerpo.categoria}`
                    rucConsulta = `&ruc=${parametrosCuerpo.ruc}`
                    ubicacionConsulta = `&ubicacion=${parametrosCuerpo.ubicacion}`
                    telefonoConsulta = `&telefono=${parametrosCuerpo.telefono}`
                    tipoComidaConsulta = `&tipoComida=${parametrosCuerpo.tipoComida}`
                    const mensajeError = "Error de validación"
                    return res.redirect("/restaurante/crear?error="+mensajeError+nombreConsulta+categoriaConsulta+rucConsulta+ubicacionConsulta+telefonoConsulta+tipoComidaConsulta)
               }else{
                    let respuestaCreacionRestaurante;
                    try{
                         respuestaCreacionRestaurante = this._restauranteService
                             .crearUno(parametrosCuerpo)
                    }catch (error) {
                         const mensajeError = "Error creando Restaurante"
                         return res.redirect("/restaurante/crear?error=" + mensajeError)
                    }
                    return res.redirect("/restaurante/inicio")
               }
          } catch (e) {
               console.error("Error", e);
               const mensajeError = "Error creando Restaurante"
               return res.redirect("/restaurante/crear?error=" + mensajeError)
          }
     }

     @Get("editar/:id")
     async vistaEditar(
         @Query() parametrosConsulta,
         @Param() parametrosRuta,
         @Res() res,
         @Session() session
     ){
          const estaLogueado = session.usuario;
          if(!estaLogueado){
               return res.redirect("/login")
          }
          const id = Number(parametrosRuta.id);
          let restauranteEncontrado
          try{
               restauranteEncontrado = await this._restauranteService.buscarUno(id)
          } catch (error) {
               console.log("Error del servidor"+error)
               return res.redirect("/restaurante/inicio?error=Error buscando equipo")
          }
          if (restauranteEncontrado){
               return res.render(
                   "restaurantes/crear-restaurante",
                   {
                        error: parametrosConsulta.error,
                        restaurante: restauranteEncontrado,
                        nombre: restauranteEncontrado.nombre,
                        ruc: restauranteEncontrado.ruc,
                        categoria: restauranteEncontrado.categoria,
                        ubicacion: restauranteEncontrado.ubicacion,
                        telefono: restauranteEncontrado.telefono,
                        tipoComida: restauranteEncontrado.tipoComida
                   }
               )
          }else{
               return res.redirect("/restaurante/inicio?error=Restaurante no encontrado")
          }
     }

     @Post("editarDesdeVista/:id")
     async editarDesdeVista(
         @Param() parametrosRuta,
         @Body() parametrosCuerpo,
         @Res() res
     ){
          const restauranteValidado = new RestauranteUpdateDTO();
          restauranteValidado.nombre = parametrosCuerpo.nombre;
          restauranteValidado.categoria = parametrosCuerpo.categoria;
          restauranteValidado.ruc = parametrosCuerpo.ruc;
          restauranteValidado.ubicacion = parametrosCuerpo.ubicacion;
          restauranteValidado.telefono = parametrosCuerpo.telefono;
          restauranteValidado.tipoComida = restauranteValidado.tipoComida;

          let nombreConsulta, categoriaConsulta, rucConsulta, ubicacionConsulta, telefonoConsulta, tipoComidaConsulta;
          try {
               const errores: ValidationError[] = await validate(restauranteValidado);
               if (errores.length > 0){
                    console.log("Errores", errores)
                    nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                    categoriaConsulta = `&categoria=${parametrosCuerpo.categoria}`
                    rucConsulta = `&ruc=${parametrosCuerpo.ruc}`
                    ubicacionConsulta = `&ubicacion=${parametrosCuerpo.ubicacion}`
                    telefonoConsulta = `&telefono=${parametrosCuerpo.telefono}`
                    tipoComidaConsulta = `&tipoComida=${parametrosCuerpo.tipoComida}`
                    const mensajeError = "Error de validación"
                    return res.redirect("/restaurante/editar/"+parametrosRuta.id+"?error="+mensajeError+nombreConsulta+categoriaConsulta+rucConsulta+ubicacionConsulta+telefonoConsulta+tipoComidaConsulta)
               }else{
                    const restauranteEditado = {
                         id: Number(parametrosRuta.id),
                         nombre: parametrosCuerpo.nombre,
                         categoria: parametrosCuerpo.categoria,
                         ruc: parametrosCuerpo.ruc,
                         ubicacion: parametrosCuerpo.ubicacion,
                         tipoComida: parametrosCuerpo.tipoComida,
                         telefono: parametrosCuerpo.telefono
                    } as RestauranteEntity;
                    let respuestaEdicionRestaurante;
                    try{
                         respuestaEdicionRestaurante = this._restauranteService
                             .editarUno(restauranteEditado)
                         return res.redirect("/restaurante/inicio?mensaje=Restaurante editado")
                    }catch (error) {
                         const mensajeError = "Error editando Restaurante"
                         console.log(error)
                         return res.redirect("/restaurante/editar/"+parametrosRuta.id+"?error=" + mensajeError)
                    }
                    return res.redirect("/restaurante/inicio")
               }
          } catch (e) {
               console.error("Error", e);
               const mensajeError = "Error editando Restaurante"
               return res.redirect("/restaurante/editar/"+parametrosRuta.id+"?error=" + mensajeError)
          }
     }

     @Post("eliminarDesdeVista/:id")
     async eliminarDesdeVista(
         @Param() parametrosRuta,
         @Res() res
     ){
          try{
               const id = Number(parametrosRuta.id)
               await this._restauranteService.eliminarUno(id);
               return res.redirect("/restaurante/inicio?mensaje=Restaurante eliminado")
          }catch (error) {
               console.log(error);
               return res.redirect("/restaurante/inicio?error=Error eliminando restaurante")
          }
     }

}