import { Materialinspection001wb } from "src/entity/MaterialInspection001wb";


export class MaterialinspectionDTO {
    slNo: number;
    unitdepartslNo: number;
    iirno: string;
    cdate: Date;
    scname: string;
    dcno: string;
    refno: string;
    pdate: Date;
    cponumber: string;
    sponumber: string;
    grnumber: string;
    remark: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

  setProperties(materialinspection001wb: Materialinspection001wb) {
    this.slNo = materialinspection001wb.slNo;
    this.unitdepartslNo = materialinspection001wb.unitdepartslNo;
    this.iirno = materialinspection001wb.iirno;
    this.cdate = materialinspection001wb.cdate;
    this.scname = materialinspection001wb.scname;
    this.dcno = materialinspection001wb.dcno;
    this.refno = materialinspection001wb.refno;
    this.pdate = materialinspection001wb.pdate;
    this.cponumber = materialinspection001wb.cponumber;
    this.sponumber = materialinspection001wb.sponumber;
    this.grnumber = materialinspection001wb.grnumber;
    this.remark = materialinspection001wb.remark;
    this.insertUser = materialinspection001wb.insertUser;
    this.insertDatetime = materialinspection001wb.insertDatetime;
    this.updatedUser = materialinspection001wb.updatedUser;
    this.updatedDatetime = materialinspection001wb.updatedDatetime;
  }
}