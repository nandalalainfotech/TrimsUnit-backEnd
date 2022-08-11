import { Supplieraudit001wb } from "src/entity/Supplieraudit001wb";


export class SupplierauditDTO {
    slNo: number;
    unitdepartslNo: number;
    supregslno: number;
    status: string;
    date: Date;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(supplieraudit001wb: Supplieraudit001wb) {
        this.slNo = supplieraudit001wb.slNo;
        this.unitdepartslNo = supplieraudit001wb.unitdepartslNo;
        this.supregslno = supplieraudit001wb.supregslno;
        this.status = supplieraudit001wb.status;
        this.date = supplieraudit001wb.date;
        this.insertUser = supplieraudit001wb.insertUser;
        this.insertDatetime = supplieraudit001wb.insertDatetime;
        this.updatedUser = supplieraudit001wb.updatedUser;
        this.updatedDatetime = supplieraudit001wb.updatedDatetime;
    }
}