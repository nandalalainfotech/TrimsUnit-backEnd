import { Part001mb } from "src/entity/Part001mb";

export class PartDTO {
    slNo: number;
    unitdepartslNo: number;
    partno: string;
    partname: string;
    hsn: string;
    splan: string;
    descrip: string;
    qunty: string;
    unitamount: number;
    uom: string;
    gst: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
  
    setProperties(part001mb: Part001mb) {
      this.slNo = part001mb.slNo;
      this.unitdepartslNo = part001mb.unitdepartslNo;
      this.partno = part001mb.partno;
      this.partname = part001mb.partname;
      this.hsn = part001mb.hsn;
      this.splan = part001mb.splan;
      this.descrip=part001mb.descrip;
      this.unitamount=part001mb.unitamount;
      this.uom=part001mb.uom;
      this.gst=part001mb.gst;
      this.qunty=part001mb.qunty;
      this.insertUser = part001mb.insertUser;
      this.insertDatetime = part001mb.insertDatetime;
      this.updatedUser = part001mb.updatedUser;
      this.updatedDatetime = part001mb.updatedDatetime;
    }
  }