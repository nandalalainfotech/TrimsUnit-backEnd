import { Payment001wb } from "src/entity/Payment001wb";

export class PaymentDTO {
    slNo: number;
    unitdepartslNo: number;
    saleorderSlno: number;
    payDate: Date;
    payStatus: string;
    dueDate: Date;
    gstNo: number;
    gstPercent: string;
    gstAmount: number;
    totalAmount: number;
    remarks: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(payment001wb: Payment001wb) {
        this.slNo = payment001wb.slNo;
        this.unitdepartslNo = payment001wb.unitdepartslNo;
        this.saleorderSlno = payment001wb.saleorderSlno;
        this.payDate = payment001wb.payDate;
        this.payStatus = payment001wb.payStatus;
        this.dueDate = payment001wb.dueDate;
        this.gstNo = payment001wb.gstNo;
        this.gstPercent = payment001wb.gstPercent;
        this.gstAmount = payment001wb.gstAmount;
        this.totalAmount = payment001wb.totalAmount;
        this.remarks = payment001wb.remarks;
        this.insertUser = payment001wb.insertUser;
        this.insertDatetime = payment001wb.insertDatetime;
        this.updatedUser = payment001wb.updatedUser;
        this.updatedDatetime = payment001wb.updatedDatetime;
    }
}