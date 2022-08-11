import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChecklistController } from "src/controller/checklist.controller";
import { Checklist001mb } from "src/entity/Checklist001mb";
import { ChecklistSettingService } from "src/service/checklist.service";


@Module({
    imports: [TypeOrmModule.forFeature([Checklist001mb])],
    providers: [ChecklistSettingService],
    controllers: [ChecklistController],
})
export class ChecklistModule { }