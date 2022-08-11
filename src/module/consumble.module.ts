import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsumbleController } from "src/controller/consumble.controller";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { ConsumbleService } from "src/service/consumbele.service";



@Module({
    imports: [TypeOrmModule.forFeature([Consumble001mb])],
    providers: [ConsumbleService],
    controllers: [ConsumbleController],
})

export class ConsumbleModule { }