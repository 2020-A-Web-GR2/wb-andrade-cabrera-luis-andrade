import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {RestauranteModule} from "./restaurante/restaurante.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RestauranteEntity} from "./restaurante/restaurante.entity";

@Module({
  imports: [
      RestauranteModule,
      TypeOrmModule.forRoot({
              name:'default', // Nombre de conexión
              type: 'mysql', //Mysql o postgress
              host: 'localhost', //ip
              port: 3306, //puerto
              username: 'root', //usuario
              password: 'kakaroto', // password
              //password: 'test',
              database: 'Examen', // Base de datos
              entities: [
                  RestauranteEntity
              ],
              synchronize: true, // Actualizar el esquema de la base de datso
              dropSchema: true, //Eliminar Datos y el Esquema de base de datos //true para borrar  y volver a generar
          }
      )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
