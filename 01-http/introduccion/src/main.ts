import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*Aquí irá cualquier configuración antes del app.listen
  luego de esto no se ejecutará ningun código*/
  await app.listen(3001);
}
bootstrap();
