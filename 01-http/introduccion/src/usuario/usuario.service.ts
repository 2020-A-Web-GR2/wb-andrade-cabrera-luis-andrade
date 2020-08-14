
import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {
    }
    crearUno(nuevoUsuario: UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) // Promesa
    }
    buscarTodos(){
        return this.repositorio.find() //Promesa
    }
    buscarUno(id: number){
        return this.repositorio.findOne(id) //Promesa
    }
    editarUno(usuarioEditado: UsuarioEntity){
        return this.repositorio.save(usuarioEditado); // La documentación recomienda utlizar este método
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
}