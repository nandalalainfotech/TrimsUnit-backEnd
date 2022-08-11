import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartspecifcationController } from "src/controller/Partspecification.controller";
import { Partspecification001wb } from "src/entity/Partspecification001wb";
import { Specification001wb } from "src/entity/Specification001wb";
import { PartspecificationService } from "src/service/Partspecification.service";


@Module({
    imports: [TypeOrmModule.forFeature([Partspecification001wb,Specification001wb])],
    providers: [PartspecificationService],
    controllers: [PartspecifcationController],
})

export class PartspecificationModule { }