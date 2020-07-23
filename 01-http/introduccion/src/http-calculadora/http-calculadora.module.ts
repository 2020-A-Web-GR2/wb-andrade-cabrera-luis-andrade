import {Module} from "@nestjs/common";
import {HttpCalculadoraController} from "./http-calculadora.controller";

@Module({
    imports: [],
    controllers: [
        HttpCalculadoraController
    ],
    providers: [],
})
export class HttpCalculadoraModule{

}