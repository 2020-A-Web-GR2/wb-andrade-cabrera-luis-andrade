import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser'); //Importar cosas con JS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express'); //Importar cosas con JS
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*Aquí irá cualquier configuración antes del app.listen
  luego de esto no se ejecutará ningun código*/
  app.use(cookieParser('Me agradan los poliperros'))
  app.set('view engine','ejs')
  app.use(express.static('publico'));
  await app.listen(3001);
}
bootstrap();
