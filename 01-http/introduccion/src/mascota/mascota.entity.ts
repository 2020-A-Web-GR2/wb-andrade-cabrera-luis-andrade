import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ManyToOne, OneToMany} from "typeorm/index";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";

@Entity()
export class MascotaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(
        type => UsuarioEntity, //Entidad que estamos relacionando
        usuario => usuario.mascotas //Campo con el que relacionamos
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => VacunaEntity,//Que entidad nos relacionamos
        vacuna => vacuna.mascota //Campo con el que nos relacionamos
    )
        //Como buena practica e definira el nombre de la relacion con plural
    vacunas: VacunaEntity[];
}