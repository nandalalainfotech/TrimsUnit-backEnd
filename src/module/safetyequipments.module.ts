import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SafetyEquipmentsControllers } from "src/controller/safetyequipmentscontroller";
import { Safetyequwb001 } from "src/entity/Safetyequwb001";
import { SafetyEquipmentsService } from "src/service/safetyequipments.service";


@Module({
    imports: [TypeOrmModule.forFeature([Safetyequwb001])],

    providers: [SafetyEquipmentsService],
    controllers: [SafetyEquipmentsControllers],
})
export class SafetyEquipmentsModule { }