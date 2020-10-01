import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("restaurante")
export class RestauranteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    ruc: string;

    @Column()
    categoria: string;

    @Column()
    ubicacion: string;

    @Column()
    telefono: string;

    @Column()
    tipoComida: string;
}