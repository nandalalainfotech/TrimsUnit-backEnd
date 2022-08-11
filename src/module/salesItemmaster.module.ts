import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesItemMbController } from "src/controller/salesitem.controller";
import { Salesitem001mb } from "src/entity/Salesitem001mb";
import { SalesItemMbService } from "src/service/salesitem.service";




@Module({
    imports: [TypeOrmModule.forFeature([Salesitem001mb])],
    providers: [SalesItemMbService],
    controllers: [SalesItemMbController],
})

export class SalesItemModule { }