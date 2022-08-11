import { Childpart001mb } from "src/entity/ChildPart001mb";

export class ChildPartDTO {
  slNo: number;
  unitdepartslNo: number;
  cpartno: string;
  cpartname: string;
  splan: string;
  descrip: string;
  hsn: string;
  qunty: string;
  unitamount: number;
  uom: string;
  gst: number;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  setProperties(childpart001mb: Childpart001mb) {
    this.slNo = childpart001mb.slNo;
    this.unitdepartslNo = childpart001mb.unitdepartslNo;
    this.cpartno = childpart001mb.cpartno;
    this.cpartname = childpart001mb.cpartname;
    this.splan = childpart001mb.splan;
    this.descrip=childpart001mb.descrip;
    this.unitamount=childpart001mb.unitamount;
    this.uom=childpart001mb.uom;
    this.gst=childpart001mb.gst;
    this.hsn=childpart001mb.hsn;
    this.qunty=childpart001mb.qunty;
    this.insertUser = childpart001mb.insertUser;
    this.insertDatetime = childpart001mb.insertDatetime;
    this.updatedUser = childpart001mb.updatedUser;
    this.updatedDatetime = childpart001mb.updatedDatetime;
  }
}
