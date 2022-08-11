import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustemerRegistrationController } from "src/controller/CustemerRegistration.controller";
import { Custemerregistration001mb } from "src/entity/Custemerregistration001mb";
import { CustemerRegistrationService } from "src/service/CustemerRegistration.service";


@Module({
    imports: [TypeOrmModule.forFeature([Custemerregistration001mb])],
    providers: [CustemerRegistrationService],
    controllers: [CustemerRegistrationController],
})
export class CustemerRegistrationModule { }