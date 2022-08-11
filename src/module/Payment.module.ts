import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentController } from "src/controller/Payment.controller";
import { Payment001wb } from "src/entity/Payment001wb";
import { PaymentService } from "src/service/Payment.service";


@Module({
    imports: [TypeOrmModule.forFeature([Payment001wb])],
    providers: [PaymentService],
    controllers: [PaymentController],
})

export class PaymentModule { }