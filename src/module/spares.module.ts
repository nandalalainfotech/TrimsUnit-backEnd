import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SparesController } from "src/controller/spares.controller";
import { Spares001mb } from "src/entity/Spares001mb";
import { SpareService } from "src/service/spares.service";

@Module({
    imports: [TypeOrmModule.forFeature([Spares001mb])],
    providers: [SpareService],
    controllers: [SparesController],
  })
  export class SpareModule { }