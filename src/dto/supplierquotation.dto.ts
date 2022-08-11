import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";

export class SupplierQuotationDTO {
  slNo: number;
  unitdepartslNo: number;
  supplierSlno: number;
  supliername: string;
  supliertype: string;
  address: string;
  quotationNo: string;
  itemname: string;
  quotationDate: Date;
  validity: Date;
  personName: string;
  desgnation: string;
  mnumber: number;
  mobile: number;
  mailid: string;
  prsno: string;
  department: string;
  level: string;
  termsCondition: string;
  // filename: string = "";
  // filepath: string;
  // originalfilename: string;
  status: string;
  remarks: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  supplierItems:Supplierquotationitems001wb[];

  setProperties(supplierquotation001wb: Supplierquotation001wb) {
    this.supplierItems = [];
    this.slNo = supplierquotation001wb.slNo;
    this.unitdepartslNo = supplierquotation001wb.unitdepartslNo;
    this.supplierSlno = supplierquotation001wb.supplierSlno;
    this.supliername = supplierquotation001wb.supliername;
    this.supliertype = supplierquotation001wb.supliertype;
    this.quotationNo = supplierquotation001wb.quotationNo;
    this.address = supplierquotation001wb.address;
    this.quotationDate = new Date(supplierquotation001wb.quotationDate);
    this.validity = new Date(supplierquotation001wb.validity);
    this.personName = supplierquotation001wb.personName;
    this.desgnation = supplierquotation001wb.desgnation;
    this.mnumber = supplierquotation001wb.mnumber;
    this.mobile = supplierquotation001wb.mobile;
    this.level = supplierquotation001wb.level;
    this.department = supplierquotation001wb.department;
    this.mailid = supplierquotation001wb.mailid;
    this.prsno = supplierquotation001wb.prsno;
    this.termsCondition = supplierquotation001wb.termsCondition;
    // this.filename = supplierquotation001wb.filename;
    // this.filepath = supplierquotation001wb.filepath;
    // this.originalfilename = supplierquotation001wb.originalfilename;
    this.insertUser = supplierquotation001wb.insertUser;
    this.insertDatetime = supplierquotation001wb.insertDatetime;
    this.updatedUser = supplierquotation001wb.updatedUser;
    this.updatedDatetime = supplierquotation001wb.updatedDatetime;
    this.status = supplierquotation001wb.status;
    this.remarks = supplierquotation001wb.remarks;
  }

}