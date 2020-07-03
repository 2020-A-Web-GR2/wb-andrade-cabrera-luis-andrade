import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpJuegoModule } from './http/http-juego.module';

@Module({
  imports: [
      // Aquí otros módulos
    HttpJuegoModule
  ],
  controllers: [
      // Controladores APP MODULE
      AppController],
  providers: [
      // SERVICIOS APP MODULE
      AppService],
})
export class AppModule {}
