import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialinspectionController } from "src/controller/Materialinspection.controller";
import { Materialinspection001wb } from "src/entity/MaterialInspection001wb";
import { MaterialinspectionService } from "src/service/Materialinspection.service";




@Module({
    imports: [TypeOrmModule.forFeature([Materialinspection001wb])],
    providers: [MaterialinspectionService],
    controllers: [MaterialinspectionController],
})

export class MaterialinspectionModule { }