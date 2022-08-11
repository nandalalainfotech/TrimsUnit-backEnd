import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActitvityController } from "src/controller/activity.controller";
import { Activity001mb } from "src/entity/Activity001mb";
import { ActivityService } from "src/service/activity.service";


@Module({
    imports: [TypeOrmModule.forFeature([Activity001mb])],
    providers: [ActivityService],
    controllers: [ActitvityController],
})
export class ActivityModule { }