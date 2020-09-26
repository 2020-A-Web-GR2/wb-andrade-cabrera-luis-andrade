import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser'); //Importar cosas con JS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express'); //Importar cosas con JS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const session = require('express-session');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FileStore = require('session-file-store')(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*Aquí irá cualquier configuración antes del app.listen
  luego de esto no se ejecutará ningun código*/
  app.use(cookieParser('Me agradan los poliperros'))
  app.set('view engine','ejs')
  app.use(express.static('publico'));
  app.use(
      session({
        name: 'server-session-id',
        secret: 'No sera de tomar un traguito',
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false},
        store: new FileStore(),
      }),
  );
  await app.listen(3001);
}
bootstrap();
