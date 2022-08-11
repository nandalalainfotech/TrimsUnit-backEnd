import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";

export class PurchasereqslipDTO {
    slNo: number;
    unitdepartslNo: number;
    date: Date;
    prsNo: string;
    poDate: Date;
    reqDate: Date;
    poNo: string;
    remarks: string;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    purchasereqitem?: Purchasereqitem001wb[];

    setProperties(purchasereqslip001wb: Purchasereqslip001wb) {
        this.unitdepartslNo = purchasereqslip001wb.unitdepartslNo;
        this.slNo = purchasereqslip001wb.slNo;
        this.date = purchasereqslip001wb.date;
        this.prsNo = purchasereqslip001wb.prsNo;
        this.poDate = purchasereqslip001wb.poDate;
        this.reqDate = purchasereqslip001wb.reqDate;
        this.poNo = purchasereqslip001wb.poNo;
        this.remarks = purchasereqslip001wb.remarks;
        this.status = purchasereqslip001wb.status;
        this.insertUser = purchasereqslip001wb.insertUser;
        this.insertDatetime = purchasereqslip001wb.insertDatetime;
        this.updatedUser = purchasereqslip001wb.updatedUser;
        this.updatedDatetime = purchasereqslip001wb.updatedDatetime;
    }
}