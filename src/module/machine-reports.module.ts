import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MachineReportsController } from "src/controller/machine-reports.controller";
import { Breakdown001mb } from "src/entity/Breakdown001mb";
import { Breakdownreg001wb } from "src/entity/Breakdownreg001wb";
import { Dailychecklist001wb } from "src/entity/Dailychecklist001wb";
import { Preventivechecklist001wb } from "src/entity/Preventivechecklist001wb";
import { Preventiveplan001wb } from "src/entity/Preventiveplan001wb";
import { MachineReportsService } from "src/service/machine-reports.service";



@Module({
    imports: [TypeOrmModule.forFeature([Preventiveplan001wb, Preventivechecklist001wb,Dailychecklist001wb,Breakdownreg001wb])],
    providers: [MachineReportsService],
    controllers: [MachineReportsController],
})
export class MachineReportsModule { }