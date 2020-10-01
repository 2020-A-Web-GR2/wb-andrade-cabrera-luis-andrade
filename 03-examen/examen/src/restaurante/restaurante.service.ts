import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RestauranteEntity} from "./restaurante.entity";
import {Column, FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class RestauranteService {
    constructor(
        @InjectRepository(RestauranteEntity)
        private repositorio: Repository<RestauranteEntity>
    ) {
    }

    crearUno(nuevoRestaurante: RestauranteEntity){
        return this.repositorio.save(nuevoRestaurante)
    }
    buscarTodos(textoDeConsulta?: string){
        const consulta: FindManyOptions<RestauranteEntity> = {
            where: [
                {
                    nombre: Like(`%${textoDeConsulta}`)
                },
                {
                    categoria: Like(`%${textoDeConsulta}`)
                }
            ]
        }
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id) //Promesa
    }
    editarUno(restauranteEditado: RestauranteEntity){
        return this.repositorio.save(restauranteEditado);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
}