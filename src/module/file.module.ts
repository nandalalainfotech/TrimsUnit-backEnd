import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileController } from "src/controller/file.controller";
import { File001mb } from "src/entity/File001mb";
import { FileMangerService } from "src/service/file.service";






@Module({
    imports: [TypeOrmModule.forFeature([File001mb])],
    providers: [FileMangerService],
    controllers: [FileController],
  })
  export class FileModule { }