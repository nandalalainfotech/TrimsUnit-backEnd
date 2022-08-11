import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierAssessmentController } from "src/controller/supplierAssessment.controller";
import { Supplierassessment001wb } from "src/entity/Supplierassessment001wb";
import { SupplierAssessmentService } from "src/service/supplierAssessment.service";

@Module({
    imports: [TypeOrmModule.forFeature([Supplierassessment001wb])],
    providers: [SupplierAssessmentService],
    controllers: [SupplierAssessmentController],
})
export class SupplierAssessmentModule { }