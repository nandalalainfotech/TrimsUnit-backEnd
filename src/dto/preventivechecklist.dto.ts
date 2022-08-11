import { Preventivechecklist001wb } from "src/entity/Preventivechecklist001wb";

export class PreventiveChecklistDTO {
    slNo: number;
    unitdepartslNo: number;
    mslno: number;
    cpslno: number;
    checkpointdate: Date;
    observation: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(preventivechecklist001wb: Preventivechecklist001wb) {
        this.slNo = preventivechecklist001wb.slNo;
        this.unitdepartslNo = preventivechecklist001wb.unitdepartslNo;
        this.mslno = preventivechecklist001wb.mslno;
        this.cpslno = preventivechecklist001wb.cpslno;
        this.checkpointdate = preventivechecklist001wb.checkpointdate;
        this.observation = preventivechecklist001wb.observation;
        this.insertUser = preventivechecklist001wb.insertUser;
        this.insertDatetime = preventivechecklist001wb.insertDatetime;
        this.updatedUser = preventivechecklist001wb.updatedUser;
        this.updatedDatetime = preventivechecklist001wb.updatedDatetime;
    }
}