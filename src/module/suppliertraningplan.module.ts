import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuppliertrainingController } from "src/controller/suppliertraningplan.controller";
import { Suppliertrainingplan001wb } from "src/entity/Suppliertrainingplan001wb";
import { SuppliertrainingService } from "src/service/suppliertraningplan.service";



@Module({
    imports: [TypeOrmModule.forFeature([Suppliertrainingplan001wb])],
    providers: [SuppliertrainingService],
    controllers: [SuppliertrainingController],
})
export class SuppliertrainingModule { }