import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DailyCheckListController } from "src/controller/dailychecklist.controller";
import { Dailychecklist001wb } from "src/entity/Dailychecklist001wb";
import { DailyCheckListService } from "src/service/dailychecklist.service";


@Module({
    imports: [TypeOrmModule.forFeature([Dailychecklist001wb])],
    providers: [DailyCheckListService],
    controllers: [DailyCheckListController],
})
export class DailyCheckListModule { }