import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesOrderController } from "src/controller/salesOrder.controller";
import { Salesorder001wb } from "src/entity/Salesorder001wb";
import { SalesOrderService } from "src/service/salesOrder.service";



@Module({
    imports: [TypeOrmModule.forFeature([Salesorder001wb])],
    providers: [SalesOrderService],
    controllers: [SalesOrderController],
})

export class SalesOrderModule { }