import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpJuegoModule } from './http/http-juego.module';
import {HttpCalculadoraModule} from "./http-calculadora/http-calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {VacunaModule} from "./vacuna/vacuna.module";
import {MascotaModule} from "./mascota/mascota.module";
import {MascotaEntity} from "./mascota/mascota.entity";
import {VacunaEntity} from "./vacuna/vacuna.entity";
@Module({
  imports: [
      // Aquí otros módulos
      HttpJuegoModule,
      HttpCalculadoraModule,
      UsuarioModule,
      MascotaModule,
      VacunaModule,
      TypeOrmModule.forRoot({
          name:'default', // Nombre de conexión
          type: 'mysql', //Mysql o postgress
          host: 'localhost', //ip
          //host: '34.68.28.243',
          port: 3306, //puerto
          username: 'root', //usuario
          password: 'kakaroto', // password
          //password: 'test',
          database: 'test', // Base de datos
          entities: [// TODAS LAS ENTIDADEs
              UsuarioEntity,
              MascotaEntity,
              VacunaEntity,
          ],
          synchronize: true, // Actualizar el esquema de la base de datso
          dropSchema: false //Eliminar Datos y el Esquema de base de datos
      }),
  ],
  controllers: [
      // Controladores APP MODULE
      AppController],
  providers: [
      // SERVICIOS APP MODULE
      AppService],
})
export class AppModule {}
