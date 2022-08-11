import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItemMbController } from "src/controller/orderitems.controller";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { OrderItemMbService } from "src/service/orderitems.service";


@Module({
    imports: [TypeOrmModule.forFeature([Orderitem001mb])],
    providers: [OrderItemMbService],
    controllers: [OrderItemMbController],
})
export class OrederItemMbModule { }