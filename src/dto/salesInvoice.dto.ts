import { Custemer001wb } from "src/entity/Custemer001wb";
import { Salesinvoice001wb } from "src/entity/Salesinvoice001wb";


export class SalesInvoiceDTO {
   
    slNo: number;
    unitdepartslNo: number;
    custmrSlno: number;
    consignee: string;
    date: Date;
    refno: string;
    pono: string;
    remarks: string | null;
    statusSlno: number | null;
    otherRef: string;
    dispatchThrough: string;
    destination: string;
    termsDelivery: string;
    supplierFrom: string;
    hsn: string;
    dueOn: Date;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    custemerSlno2?: Custemer001wb[];
   
   
    
    setProperties(salesinvoice001wb: Salesinvoice001wb) {
    this.slNo = salesinvoice001wb.slNo;
    this.unitdepartslNo = salesinvoice001wb.unitdepartslNo; 
    this.custmrSlno = salesinvoice001wb.custmrSlno;
    this.consignee = salesinvoice001wb.consignee;
    this.date = new Date(salesinvoice001wb.date);
    this.refno = salesinvoice001wb.refno;
    this.pono = salesinvoice001wb.pono;
    this.remarks=salesinvoice001wb.remarks;
    this.statusSlno=salesinvoice001wb.statusSlno;
    this.otherRef = salesinvoice001wb.otherRef;
    this.dispatchThrough = salesinvoice001wb.dispatchThrough;
    this.destination = salesinvoice001wb.destination;
    this.termsDelivery = salesinvoice001wb.termsDelivery;
    this.supplierFrom = salesinvoice001wb.supplierFrom;
    this.hsn = salesinvoice001wb.hsn;
    this.dueOn = salesinvoice001wb.dueOn;
    this.insertUser = salesinvoice001wb.insertUser;
    this.insertDatetime = salesinvoice001wb.insertDatetime;
    this.updatedUser = salesinvoice001wb.updatedUser;
    this.updatedDatetime = salesinvoice001wb.updatedDatetime;
     

    }
}