import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpJuegoModule } from './http/http-juego.module';
import {HttpCalculadoraModule} from "./http-calculadora/http-calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
@Module({
  imports: [
      // Aquí otros módulos
      HttpJuegoModule,
      HttpCalculadoraModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name:'default', // Nombre de conexión
          type: 'mysql', //Mysql o postgress
          host: 'localhost', //ip
          port: 3306, //puerto
          username: 'root', //usuario
          password: 'kakaroto', // password
          database: 'test', // Base de datos
          entities: [// TODAS LAS ENTIDADEs
            UsuarioEntity
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
