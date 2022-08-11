import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeFecilityController } from "src/controller/employef.controller";
import { Employef001mb } from "src/entity/Employef001mb";
import { EmployeFecilityService } from "src/service/employef.service";





@Module({
    imports: [TypeOrmModule.forFeature([Employef001mb])],
    providers: [EmployeFecilityService],
    controllers: [EmployeFecilityController],
  })
  export class EmployefModule { }