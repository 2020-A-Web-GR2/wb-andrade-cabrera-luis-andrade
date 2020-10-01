import {Body, Controller, Get, Post, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("login")
  login(
      @Res() res
  ){
    return res.render("login/login")
  }

  @Post("login")
  loginPost(
      @Body() parametrosConsulta,
      @Res() res,
      @Session() session
  ){
    //validando datos
    const usuario = parametrosConsulta.usuario;
    const password = parametrosConsulta.password;
    if (usuario == "adrian" && password == "1234") {
      session.usuario = usuario
      return res.redirect("/restaurante/inicio");
    } else {
         return res.redirect("/login");
    }
  }

  @Get("logout")
  logout(
      @Res()
          response,
      @Session()
          session,
      @Req() request
  ) {
    session.username = undefined;
    session.roles = undefined;
    request.session.destroy();
    return response.redirect("/login")
  }
}
