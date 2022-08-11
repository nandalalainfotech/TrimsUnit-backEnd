import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseOrderController } from "src/controller/purchaseorder.controller";
import { Companydetails001mb } from "src/entity/Companydetails001mb";
import { Consignee001mb } from "src/entity/Consignee001mb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { PurchaseOrderService } from "src/service/purchaseorder.service";

@Module({
    imports: [TypeOrmModule.forFeature([Purchaseorder001wb,Orderitem001wb,Companydetails001mb,Consignee001mb,Orderitem001mb])],
    providers: [PurchaseOrderService],
    controllers: [PurchaseOrderController],
})

export class PurchaseOrderModule { }