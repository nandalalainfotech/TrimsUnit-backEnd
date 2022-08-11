import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpecificationController } from "src/controller/Specification.controller";
import { Specification001wb } from "src/entity/Specification001wb";
import { SpecificationService } from "src/service/Specification.service";



@Module({
    imports: [TypeOrmModule.forFeature([Specification001wb])],
    providers: [SpecificationService],
    controllers: [SpecificationController],
})

export class SpecificationModule { }