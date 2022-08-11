import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierRegistrationController } from "src/controller/supplier-registration.controller";
import { Suppliercontact001wb } from "src/entity/Suppliercontact001wb";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { SupplierRegistrationService } from "src/service/supplier-registration.service";

@Module({
    imports: [TypeOrmModule.forFeature([Supplierregistration001mb,Suppliercontact001wb])],
    providers: [SupplierRegistrationService],
    controllers: [SupplierRegistrationController],
})
export class SupplierRegistrationModule { }