import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UnitMasterController } from "src/controller/unitmaster.controller";
import { Unitmaster001mb } from "src/entity/Unitmaster001mb";
import { UnitMasterService } from "src/service/unitmaster.service";

@Module({
    imports: [TypeOrmModule.forFeature([Unitmaster001mb])],
    providers: [UnitMasterService],
    controllers: [UnitMasterController],
})

export class UnitMasterModule { }