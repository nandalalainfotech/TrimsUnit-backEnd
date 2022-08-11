import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreakdownController } from "src/controller/breakdown-setting.controller";
import { Breakdown001mb } from "src/entity/Breakdown001mb";
import { BreakdownService } from "src/service/breakdown-setting.service";

@Module({
    imports: [TypeOrmModule.forFeature([Breakdown001mb])],
    providers: [BreakdownService],
    controllers: [BreakdownController],
})
export class BreakdownModule { }