import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierattendanceController } from "src/controller/Supplierattendancereport.controller";
import { Supplierattendancereport001wb } from "src/entity/Supplierattendancereport001wb";
import { SupplierattendanceService } from "src/service/Supplierattendancereport.service";



@Module({
    imports: [TypeOrmModule.forFeature([Supplierattendancereport001wb])],
    providers: [SupplierattendanceService],
    controllers: [SupplierattendanceController],
})

export class SupplierattendanceModule { }