import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";



export class MaterialreceiveditemDTO {
    slNo: number;
    unitdepartslNo: number;
    itemcode: string;
    itemname: string;
    qunty: string;
    unitrate: string;
    totalamount: number;
    receivedQty: number;
    acceptedQty: number;
    rejectedQty: number;
    outstanding: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    orderitemSlno:any;
   
    setProperties(materialreceiveditem001wb: Materialreceiveditem001wb) {
    this.slNo = materialreceiveditem001wb.slNo;
    this.unitdepartslNo = materialreceiveditem001wb.unitdepartslNo;
    this.itemcode = materialreceiveditem001wb.itemcode;
    this.itemname = materialreceiveditem001wb.itemname;
    this.qunty = materialreceiveditem001wb.qunty;
    this.unitrate = materialreceiveditem001wb.unitrate;
    this.totalamount = materialreceiveditem001wb.totalamount;
    this.receivedQty = materialreceiveditem001wb.receivedQty;
    this.acceptedQty = materialreceiveditem001wb.acceptedQty;
    this.rejectedQty = materialreceiveditem001wb.rejectedQty;
    this.outstanding = materialreceiveditem001wb.outstanding;
    this.insertUser = materialreceiveditem001wb.insertUser;
    this.insertDatetime = materialreceiveditem001wb.insertDatetime;
    this.updatedUser = materialreceiveditem001wb.updatedUser;
    this.updatedDatetime = materialreceiveditem001wb.updatedDatetime;
    
    
    }
}