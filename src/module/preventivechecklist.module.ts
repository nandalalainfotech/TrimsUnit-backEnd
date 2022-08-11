import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PreventiveCheckListController } from "src/controller/preventivechecklist.controller";
import { Preventivechecklist001wb } from "src/entity/Preventivechecklist001wb";

import { PreventiveCheckListService } from "src/service/preventivechecklist.service";

@Module({
    imports: [TypeOrmModule.forFeature([Preventivechecklist001wb])],
    providers: [PreventiveCheckListService],
    controllers: [PreventiveCheckListController],
  })
  export class PreventiveCheckListModule { }