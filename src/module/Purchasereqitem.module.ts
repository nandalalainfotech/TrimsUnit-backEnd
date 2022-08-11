import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchasereqitemController } from "src/controller/purchasereqitem.controller";
import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";
import { PurchasereqslipitemService } from "src/service/purchasereqslipitem.service";




@Module({
    imports: [TypeOrmModule.forFeature([Purchasereqitem001wb])],
    providers: [PurchasereqslipitemService],
    controllers: [PurchasereqitemController]
})
export class PurchasereqitemModule { }