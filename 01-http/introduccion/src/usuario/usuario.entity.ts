import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";
import {OneToMany} from "typeorm/index";
import {MascotaEntity} from "../mascota/mascota.entity";

@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento' // Nombre de las propiedades en la clase
])
/*@Index(
    ['nombre','apellido','cedula'],
    {unique: true})*/
@Entity('db_usuario') // Nombre de la tabla
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number

    @Column({
        name:'nombre',
        type:'varchar',
        nullable: true,
    })
    nombre?: string

    @Column({
        name:'apellido',
        type:'varchar',
        nullable: true,
        length: '60',
    })
    apellido?: string

    @Column({
        name:'cedula',
        type:'varchar',
        nullable: false,
        length: '18',
        unique: true,
    })
    cedula: string

    @Column({
        name:'sueldo',
        type:'decimal',
        nullable: true,
        precision: 10, //1000000000
        scale: 4, // .0001
    })
    sueldo?: string

    @Column({
        type:'date',
        nullable: true,
        name:'fecha_nacimiento'
    })
    fechaNacimiento?: string

    @Column({
        type:'datetime',
        nullable: true,
        name:'fecha_hora_nacimiento'
    })
    fechaHoraNacimiento?: string

    @OneToMany(
        type => MascotaEntity,//Que entidad nos relacionamos
        mascota => mascota.usuario //Campo con el que nos relacionamos
    )
    //Como buena practica e definira el nombre de la relacion con plural
    mascotas: MascotaEntity[];
}