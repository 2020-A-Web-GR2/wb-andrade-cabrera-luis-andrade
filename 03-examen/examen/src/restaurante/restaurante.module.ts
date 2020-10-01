import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RestauranteController} from "./restaurante.controller";
import {RestauranteEntity} from "./restaurante.entity";
import {RestauranteService} from "./restaurante.service";

@Module(
    {
        controllers: [RestauranteController],
        imports: [
            TypeOrmModule.
                forFeature(
                    [
                        RestauranteEntity
                    ],
                "default"
            )
        ],
        providers: [
            RestauranteService
        ]
    }
)
export class RestauranteModule {

}