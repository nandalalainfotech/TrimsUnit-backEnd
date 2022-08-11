import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PreventivePlanController } from "src/controller/preventiveplan.controller";
import { Preventiveplan001wb } from "src/entity/Preventiveplan001wb";
import { PreventivePlanService } from "src/service/preventiveplan.service";

@Module({
    imports: [TypeOrmModule.forFeature([Preventiveplan001wb])],
    providers: [PreventivePlanService],
    controllers: [PreventivePlanController],
  })
  export class PreventivePlanModule { }