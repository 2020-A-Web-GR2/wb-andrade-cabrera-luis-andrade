import {Body, Controller, Get, Param, Post} from '@nestjs/common';

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

    @Get()
    mostrarTodos(){
        return 'ok'
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        };
        this.arregloUsuarios.push(nuevoUsuario)
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            //(usuario) => usuario.id === Numbre(parametrosRuta.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];
    }
}
