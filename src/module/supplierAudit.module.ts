import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierAuditController } from "src/controller/supplierAudit.controller";
import { Supplieraudit001wb } from "src/entity/Supplieraudit001wb";
import { SupplierAuditService } from "src/service/supplierAudit.service";


@Module({
    imports: [TypeOrmModule.forFeature([Supplieraudit001wb])],
    providers: [SupplierAuditService],
    controllers: [SupplierAuditController],
})
export class SupplierAuditModule { }