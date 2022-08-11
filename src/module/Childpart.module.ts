import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChildPartController } from "src/controller/childPart.controller";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { ChildPartService } from "src/service/ChildPart.service";


@Module({
    imports: [TypeOrmModule.forFeature([Childpart001mb])],
    providers: [ChildPartService],
    controllers: [ChildPartController],
})

export class ChildPartModule { }