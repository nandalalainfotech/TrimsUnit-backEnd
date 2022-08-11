import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssessmentCriteriaController } from "src/controller/assessmentCriteria.controller";
import { Assessmentcriteria001mb } from "src/entity/Assessmentcriteria001mb";
import { AssessmentCriteriaService } from "src/service/assessmentCriteria.service";

@Module({
    imports: [TypeOrmModule.forFeature([Assessmentcriteria001mb])],
    providers: [AssessmentCriteriaService],
    controllers: [AssessmentCriteriaController],
})
export class AssessmentCriteriaModule { }