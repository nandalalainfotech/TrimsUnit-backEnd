import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartController } from "src/controller/Part.controller";
import { Part001mb } from "src/entity/Part001mb";
import { PartService } from "src/service/Part.service";


@Module({
    imports: [TypeOrmModule.forFeature([Part001mb])],
    providers: [PartService],
    controllers: [PartController],
})

export class PartModule { }