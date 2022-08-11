import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierreportController } from "src/controller/supplierreportwb.controller";
import { Supplierreport001wb } from "src/entity/Supplierreport001wb";
import { SupplierreportService } from "src/service/supplierreportwb.service";


@Module({
    imports: [TypeOrmModule.forFeature([Supplierreport001wb])],
    providers: [SupplierreportService],
    controllers: [SupplierreportController],
})
export class SupplierreportModule { }