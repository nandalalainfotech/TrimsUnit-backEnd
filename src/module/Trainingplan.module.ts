import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrainingplanController } from "src/controller/Trainingplan.controller";
import { Trainingplan001mb } from "src/entity/Trainingplan001mb";
import { TrainingplanService } from "src/service/Trainingplan.service";



@Module({
    imports: [TypeOrmModule.forFeature([Trainingplan001mb])],
    providers: [TrainingplanService],
    controllers: [TrainingplanController],
})

export class TrainingplanModule { }