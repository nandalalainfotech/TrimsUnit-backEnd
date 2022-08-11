import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FixtureController } from "src/controller/fixture.controller";
import { MachineController } from "src/controller/machine.controller";
import { Fixture001mb } from "src/entity/Fixture001mb";
import { Machine001mb } from "src/entity/Machine001mb";
import { FixtureSettingService } from "src/service/fixture.service";



import { MachineSettingService } from "src/service/machine.service";

@Module({
    imports: [TypeOrmModule.forFeature([Fixture001mb])],
    providers: [FixtureSettingService],
    controllers: [FixtureController],
  })
  export class FixtureModule { }