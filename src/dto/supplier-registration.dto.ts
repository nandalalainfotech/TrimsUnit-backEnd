import { Suppliercontact001wb } from "src/entity/Suppliercontact001wb";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";


export class SupplierRegistrationDTO {
    slNo: number;
    unitdepartslNo: number;
    supplierName: string;
    supplierCode: string;
    address: string;
    contact: string;
    gstin: string;
    certification: string;
    nature: string;
    supcategory: string;
    productDesc: string;
    reputedCust: string;
    concern: string;
    otherInfo: string;
    website: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    suppliercontacts2?: Suppliercontact001wb[] = [];

    setProperties(supplierReg001mb: Supplierregistration001mb) {
        this.slNo = supplierReg001mb.slNo;
        this.unitdepartslNo = supplierReg001mb.unitdepartslNo;
        this.supplierName = supplierReg001mb.supplierName;
        this.supplierCode = supplierReg001mb.supplierCode;
        this.address = supplierReg001mb.address;
        this.contact = supplierReg001mb.contact;
        this.gstin = supplierReg001mb.gstin;
        this.certification = supplierReg001mb.certification;
        this.nature = supplierReg001mb.nature;
        this.supcategory = supplierReg001mb.supcategory;
        this.productDesc = supplierReg001mb.productDesc;
        this.reputedCust = supplierReg001mb.reputedCust;
        this.concern = supplierReg001mb.concern;
        this.otherInfo = supplierReg001mb.otherInfo;
        this.website = supplierReg001mb.website;
        this.insertUser = supplierReg001mb.insertUser;
        this.insertDatetime = supplierReg001mb.insertDatetime;
        this.updatedUser = supplierReg001mb.updatedUser;
        this.updatedDatetime = supplierReg001mb.updatedDatetime;
    }
}