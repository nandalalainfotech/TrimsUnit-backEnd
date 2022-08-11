import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustemerController } from "src/controller/Custemer-wb.controller";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { CustemerService } from "src/service/Custemer-wb-service";



@Module({
    imports: [TypeOrmModule.forFeature([Custemer001wb])],
    providers: [CustemerService],
    controllers: [CustemerController]
})
export class CustemerModule { }