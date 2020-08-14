import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController {
    public arregloUsuarios = [
        {
            id:1,
            nombre:'Andres'
        },
        {
            id:2,
            nombre:'Alisson'
        },
        {
            id:3,
            nombre:'Valeria'
        }
    ]
    public idActual = 3;

    constructor( // Inyección de dependencias
        private readonly _usuarioService: UsuarioService) {
    }

    @Get()
    async mostrarTodos(){
        try{
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:"Error del servidor"
            })
        }
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        try {
            console.log(parametrosCuerpo)
            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            return respuesta
        }catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: "Error validando datos"
            })
        }
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta,
    ){
        let respuesta;
        try{
            respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id));
        } catch (e){
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: "Error del servidor",
            })
        }
        if (respuesta){
            return respuesta;
        } else{
            throw new NotFoundException({
                mensaje: "No existen registros",
            })
        }
    }

    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        try{
            const respuesta = await this._usuarioService
                .editarUno(usuarioEditado);
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: "Error del servidor",
            })
        }
        // const indice = this.arregloUsuarios.findIndex(
        //     //(usuario) => usuario.id === Numbre(parametrosRuta.id)
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre
        // return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta,
    ) {
        const id = Number(parametrosRuta.id);
        try {
            const registroEliminado = await this._usuarioService.buscarUno(id);
            const respuesta = await this._usuarioService
                .eliminarUno(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado',
                registroEliminado: registroEliminado
            };
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: "Error del servidor"
            })
        }
        // const indice = this.arregloUsuarios.findIndex(
        //     //(usuario) => usuario.id === Numbre(parametrosRuta.id)
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // this.arregloUsuarios.splice(indice, 1)
        // return this.arregloUsuarios[indice];
    }
}
