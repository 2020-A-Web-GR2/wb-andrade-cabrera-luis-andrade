
import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {FindManyOptions, Like, Not, Repository} from "typeorm";


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
    buscarTodos(textoDeConsulta?: string){
        /* let busquedaEjemplo: FindManyOptions*/
        const consulta: FindManyOptions<UsuarioEntity> = {
            where: [
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    apellido: Like(`%${textoDeConsulta}%`)
                },
                {
                    cedula: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //Promesa
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
/*
let busquedaEjemplo: FindManyOptions<UsuarioEntity>
// buscar y relacionar
busquedaEjemplo = {
   relations: ['mascotas', 'mascotas.vacunas']
}
// buscar where
busquedaEjemplo = {
   where: {
       nombre: 'Adrian', // Busqueda exacta AND
       apellido: 'Eguez' // Busqueda exacta
   }
}
// buscar Orden
busquedaEjemplo = {
   order: {
       nombre: 'ASC', // ASCENDENTE
       id: 'DESC' // DESCENDENTE
       // Adrian Eguez  2
       // Adrian Sarzosa 1
       // Vicente Perez  3
   }
}
// buscar Paginacion
busquedaEjemplo = {
   // Primera Pagina
   // skip: 0, // (0 * 10) de 100 registros, saltate 0 registros
   // take: 10 // de 100 registros, agarra 10 registros
   // Segunda Pagina
   // skip: 10, // (1 * 10) de 100 registros, saltate 10 registros
   // take: 10 // de 100 registros, agarra 10 registros
   // Tercera Pagina
   skip: 20, // (2 * 10) de 100 registros, saltate 10 registros
   take: 10 // de 100 registros, agarra 10 registros
}
// Busqueda Where OR
busquedaEjemplo = {
   where: [
       {
           nombre: 'Adrian', // Busqueda exacta
           tipoUsuario: 1
       }, // OR
       {
           apellido: 'Adrian' // Busqueda exacta
       }
   ]
}
// Busqueda Where OR
busquedaEjemplo = {
   where: [
       {
           nombre: 'Adrian', // AND
           apellido: 'Eguez'
       }, // OR
       {
           nombre: 'Eguez', // AND
           apellido: 'Adrian'
       }
   ]
}
// Busqueda NOT
busquedaEjemplo = {
   where: {
       nombre: Not('Adrian'), // AND
   }
}
// Busqueda Less Than
busquedaEjemplo = {
   where: {
       fechaNacimiento: LessThan('1990-01-01'), // AND
   }
}
// Busqueda Less Than or Equal
busquedaEjemplo = {
   where: {
       fechaNacimiento: LessThanOrEqual('1990-01-01'), // AND
   }
}
// Busqueda More Than
busquedaEjemplo = {
   where: {
       fechaNacimiento: MoreThan('1990-01-01'), // AND
   }
}
// Busqueda More Than or Equal
busquedaEjemplo = {
   where: {
       fechaNacimiento: MoreThanOrEqual('1990-01-01'), // AND
   }
}
// Busqueda Like
busquedaEjemplo = {
   where: {
       fechaNacimiento: Like('%dr%'), // AND
   }
}
// Busqueda Beetwen
busquedaEjemplo = {
   where: {
       fechaNacimiento: Between('1990-01-01', '2020-01-01'), // AND
   }
}
// Busqueda In
busquedaEjemplo = {
   where: {
       pokemon: In([1, 2, 5, 6, 7, 8, 9, 19]),
   }
}
// Busqueda IsNull
busquedaEjemplo = {
   where: {
       casado: IsNull(),
   }
}
*/