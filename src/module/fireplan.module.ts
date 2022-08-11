import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirePlanControllers } from "src/controller/fireplan.controller";
import { FirstaidMaterialsControllers } from "src/controller/firstaidmaterials.controller";
import { Fireplan001wb } from "src/entity/Fireplan001wb";
import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { FirePlanService } from "src/service/fireplan.service";
import { FirstaidMaterialsService } from "src/service/firstaidmaterials.service";


@Module({
    imports: [TypeOrmModule.forFeature([Fireplan001wb])],

    providers: [FirePlanService],
    controllers: [FirePlanControllers],
})
export class FirePlanModule { }