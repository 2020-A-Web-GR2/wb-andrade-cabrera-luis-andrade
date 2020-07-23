import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpJuegoModule } from './http/http-juego.module';
import {HttpCalculadoraModule} from "./http-calculadora/http-calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [
      // Aquí otros módulos
    HttpJuegoModule,HttpCalculadoraModule,UsuarioModule
  ],
  controllers: [
      // Controladores APP MODULE
      AppController],
  providers: [
      // SERVICIOS APP MODULE
      AppService],
})
export class AppModule {}
