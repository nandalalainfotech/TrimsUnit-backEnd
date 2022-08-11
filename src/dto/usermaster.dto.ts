import { Department001mb } from "src/entity/Department001mb";
import { Unitmaster001mb } from "src/entity/Unitmaster001mb";

export class UnitMasterDTO {
    slNo: number;
    deptslNo: number;
    unitName: string;
    unitDescribtion: string;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    deptslNo2:Department001mb;
    
    setProperties(unitmaster001mb: Unitmaster001mb) {
        this.slNo = unitmaster001mb.slNo;
        this.deptslNo = unitmaster001mb.deptslNo;
        this.unitName = unitmaster001mb.unitName;
        this.status = unitmaster001mb.status;
        this.unitDescribtion = unitmaster001mb.unitDescribtion;
        this.insertUser = unitmaster001mb.insertUser;
        this.insertDatetime = unitmaster001mb.insertDatetime;
        this.updatedUser = unitmaster001mb.updatedUser;
        this.updatedDatetime = unitmaster001mb.updatedDatetime;
    }
}