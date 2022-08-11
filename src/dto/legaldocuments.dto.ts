import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { Legal001mb } from "src/entity/Legal001mb";

export class LegalDTO {
    slNo: number;
    unitdepartslNo: number;
    dname: string ="";
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(legal001mb : Legal001mb ) {
        
        this.slNo = legal001mb.slNo;
        this.unitdepartslNo = legal001mb.unitdepartslNo;
        this.dname = legal001mb.dname;
        this.insertUser = legal001mb.insertUser;
        this.insertDatetime = legal001mb.insertDatetime;
        this.updatedUser = legal001mb.updatedUser;
        this.updatedDatetime = legal001mb.updatedDatetime;
    }
}