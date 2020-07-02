import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      // Aquí otros módulos
  ],
  controllers: [
      // Controladores APP MODULE
      AppController],
  providers: [
      // SERVICIOS APP MODULE
      AppService],
})
export class AppModule {}
