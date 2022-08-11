import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToolController } from "src/controller/tool.controlller";
import { Tool001mb } from "src/entity/Tool001mb";
import { ToolService } from "src/service/tool.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tool001mb])],
    providers: [ToolService],
    controllers: [ToolController],
  })
  export class ToolModule { }