import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";

export class MaterialinwardDTO {
    slNo: number;
    unitdepartslNo: number;
    purchseSlno: number;
    date: Date;
    dcNo: string;
    invoiceno: string;
    dcDate: Date;
    supliername: string;
    grm: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    metriealitems?: Materialreceiveditem001wb[];
    
    setProperties(materialinward001wb: Materialinward001wb) {
        this.slNo = materialinward001wb.slNo;
        this.unitdepartslNo = materialinward001wb.unitdepartslNo;
        this.purchseSlno = materialinward001wb.purchseSlno;
        this.date = materialinward001wb.date;
        this.dcNo = materialinward001wb.dcNo;
        this.invoiceno = materialinward001wb.invoiceno;
        this.dcDate = materialinward001wb.dcDate;
        this.supliername = materialinward001wb.supliername;
        this.grm = materialinward001wb.grm;
        this.insertUser = materialinward001wb.insertUser;
        this.insertDatetime = materialinward001wb.insertDatetime;
        this.updatedUser = materialinward001wb.updatedUser;
        this.updatedDatetime = materialinward001wb.updatedDatetime
    }
}