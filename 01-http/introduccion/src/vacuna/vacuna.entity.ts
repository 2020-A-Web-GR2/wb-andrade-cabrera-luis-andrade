import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ManyToOne} from "typeorm/index";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {MascotaEntity} from "../mascota/mascota.entity";

@Entity()
export class VacunaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(
        type => MascotaEntity, //Entidad que estamos relacionando
        mascota => mascota.vacunas //Campo con el que relacionamos
    )
    mascota: MascotaEntity;
}