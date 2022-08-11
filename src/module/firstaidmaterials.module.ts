import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirstaidMaterialsControllers } from "src/controller/firstaidmaterials.controller";
import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { FirstaidMaterialsService } from "src/service/firstaidmaterials.service";


@Module({
    imports: [TypeOrmModule.forFeature([Firstaidwb001])],

    providers: [FirstaidMaterialsService],
    controllers: [FirstaidMaterialsControllers],
})
export class FirstaidMaterialsModule { }