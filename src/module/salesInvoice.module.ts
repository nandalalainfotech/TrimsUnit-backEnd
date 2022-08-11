import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesInvoiceController } from "src/controller/Salesinvoice.controller";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { Salesinvoice001wb } from "src/entity/Salesinvoice001wb";
import { SalesInvoiceService } from "src/service/SalesInvoice.service";


@Module({
    imports: [TypeOrmModule.forFeature([Salesinvoice001wb,Custemer001wb])],
    providers: [SalesInvoiceService],
    controllers: [SalesInvoiceController],
})
export class SalesinvoiceModule { }
