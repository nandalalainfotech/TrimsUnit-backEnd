import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatutoryPlanController } from "src/controller/statutoryPlan.controller";
import { Statutory001wb } from "src/entity/Statutory001wb";
import { StatutoryPlanService } from "src/service/statutoryPlan.service";


@Module({
    imports: [TypeOrmModule.forFeature([Statutory001wb])],
    providers: [StatutoryPlanService],
    controllers: [StatutoryPlanController],
  })
  export class StatutoryPlanModule { }