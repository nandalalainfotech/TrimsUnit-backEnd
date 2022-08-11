import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerController } from "src/controller/customer.controller";
import { Customer001mb } from "src/entity/Customer001mb";
import { CustomerService } from "src/service/customer.service";

@Module({
    imports: [TypeOrmModule.forFeature([Customer001mb])],
    providers: [CustomerService],
    controllers: [CustomerController],
})

export class CustomerModule { }