import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UnitDepartMasterController } from "src/controller/unitdepartmaster.controller";
import { Unitdeptmaster001mb } from "src/entity/Unitdeptmaster001mb";
import { UnitDepartMasterService } from "src/service/unitdepartmaster.service";

@Module({
    imports: [TypeOrmModule.forFeature([Unitdeptmaster001mb])],
    providers: [UnitDepartMasterService],
    controllers: [UnitDepartMasterController],
})

export class UnitDepartMasterModule { }