import { Assessmentcriteria001mb } from "src/entity/Assessmentcriteria001mb";

export class AssessmentCriteriaDTO {
    slNo: number;
    unitdepartslNo: number;
    criteria: string;
    details: string;
    max: number;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(assessmentcriteria001mb: Assessmentcriteria001mb) {
        this.slNo = assessmentcriteria001mb.slNo;
        this.unitdepartslNo = assessmentcriteria001mb.unitdepartslNo;
        this.criteria = assessmentcriteria001mb.criteria;
        this.details = assessmentcriteria001mb.details;
        this.max = assessmentcriteria001mb.max;
        this.status = assessmentcriteria001mb.status;
        this.insertUser = assessmentcriteria001mb.insertUser;
        this.insertDatetime = assessmentcriteria001mb.insertDatetime;
        this.updatedUser = assessmentcriteria001mb.updatedUser;
        this.updatedDatetime = assessmentcriteria001mb.updatedDatetime;
    }
}