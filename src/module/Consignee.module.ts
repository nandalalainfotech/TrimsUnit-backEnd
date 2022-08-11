import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsigneeController } from "src/controller/Consignee.controller";
import { Consignee001mb } from "src/entity/Consignee001mb";
import { ConsigneeService } from "src/service/Consignee.service";



@Module({
    imports: [TypeOrmModule.forFeature([Consignee001mb])],
    providers: [ConsigneeService],
    controllers: [ConsigneeController],
})

export class ConsigneeModule { }