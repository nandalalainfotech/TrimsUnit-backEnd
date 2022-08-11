import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialRequistionController } from "src/controller/material-req-slip.controller";
import { Materialreqslip001wb } from "src/entity/Materialreqslip001wb";
import { MaterialRequisitionSlipService } from "src/service/material-req-slip.service";


@Module({
    imports: [TypeOrmModule.forFeature([Materialreqslip001wb])],
    providers: [MaterialRequisitionSlipService],
    controllers: [MaterialRequistionController],
})

export class MaterialRequisitionModule { }