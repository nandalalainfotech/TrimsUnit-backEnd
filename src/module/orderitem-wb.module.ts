import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItemController } from "src/controller/orderitem-wb.controller";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { OrderItemService } from "src/service/orderitem-wb.service";



@Module({
    imports: [TypeOrmModule.forFeature([Orderitem001wb])],
    providers: [OrderItemService],
    controllers: [OrderItemController]
})
export class OrderItemModule { }