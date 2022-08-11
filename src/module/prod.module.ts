import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdController } from "src/controller/prod.controller";
import { Prod001mb } from "src/entity/Prod001mb";
import { ProdService } from "src/service/prod.service";


@Module({
    imports: [TypeOrmModule.forFeature([Prod001mb])],
    providers: [ProdService],
    controllers: [ProdController],
})
export class ProdModule { }