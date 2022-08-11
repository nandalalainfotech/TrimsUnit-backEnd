import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchasereqslipController } from "src/controller/Purchasereqslip.controller";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { PurchasereqslipService } from "src/service/Purchasereqslip.service";


@Module({
    imports: [TypeOrmModule.forFeature([Purchasereqslip001wb , Purchasereqitem001wb, Orderitem001wb])],
    providers: [PurchasereqslipService],
    controllers: [PurchasereqslipController],
})

export class PurchasereqslipModule { }