import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonController } from "src/controller/person.controller";
import { Person001mb } from "src/entity/Person001mb";
import { PersonService } from "src/service/person.service";

@Module({
    imports: [TypeOrmModule.forFeature([Person001mb])],
    providers: [PersonService],
    controllers: [PersonController],
  })
  export class PersonModule { }