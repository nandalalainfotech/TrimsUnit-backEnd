import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialinwardController } from "src/controller/materialinward.controller";
import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";
import { MaterialinwardService } from "src/service/materialinward.service";



@Module({
    imports: [TypeOrmModule.forFeature([Materialinward001wb,Materialreceiveditem001wb])],
    providers: [MaterialinwardService],
    controllers: [MaterialinwardController],
})

export class MaterialinwardModule { }