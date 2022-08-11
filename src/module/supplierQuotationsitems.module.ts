import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierquotationitemController } from "src/controller/supplierquotationitems.controller";
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";
import { SupplierquotationitemsService } from "src/service/SupplierQuotationsitems.service";




@Module({
    imports: [TypeOrmModule.forFeature([Supplierquotationitems001wb])],
    providers: [SupplierquotationitemsService],
    controllers: [SupplierquotationitemController]
})
export class SupplierquotationitemModule { }