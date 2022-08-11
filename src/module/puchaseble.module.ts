import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseableController } from "src/controller/purcheseable.controller";
import { Purchaseable001mb } from "src/entity/Purchaseable001mb";
import { PurchaseableService } from "src/service/purchaseable.service";

@Module({
    imports: [TypeOrmModule.forFeature([Purchaseable001mb])],
    providers: [PurchaseableService],
    controllers: [PurchaseableController],
})
export class PurchaseableModule { }