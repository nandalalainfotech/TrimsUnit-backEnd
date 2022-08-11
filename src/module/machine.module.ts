import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MachineController } from "src/controller/machine.controller";
import { Machine001mb } from "src/entity/Machine001mb";



import { MachineSettingService } from "src/service/machine.service";

@Module({
    imports: [TypeOrmModule.forFeature([Machine001mb])],
    providers: [MachineSettingService],
    controllers: [MachineController],
  })
  export class MachineModule { }