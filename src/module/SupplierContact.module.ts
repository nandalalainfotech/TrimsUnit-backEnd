import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierContactController } from "src/controller/SupplierContact.controller";
import { Suppliercontact001wb } from "src/entity/Suppliercontact001wb";
import { SupplierContactService } from "src/service/Suppliercontact.service";



@Module({
    imports: [TypeOrmModule.forFeature([Suppliercontact001wb])],
    providers: [SupplierContactService],
    controllers: [SupplierContactController],
})

export class SupplierContactModule { }