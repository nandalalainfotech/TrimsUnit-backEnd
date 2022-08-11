import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialreceiveditemController } from "src/controller/materialreceiveditem.controller";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";
import { MaterialreceiveditemService } from "src/service/materialreceiveditem.service";




@Module({
    imports: [TypeOrmModule.forFeature([Materialreceiveditem001wb])],
    providers: [MaterialreceiveditemService],
    controllers: [MaterialreceiveditemController]
})
export class MaterialreceiveditemModule { }