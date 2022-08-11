import { CustemerRegistrationDTO } from "src/dto/custemerRegistration.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Salesinvoice001wb } from "./Salesinvoice001wb";

@Entity("custemerregistration001mb", { schema: "trims" })
export class Custemerregistration001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("varchar", { name: "custemername", length: 40 })
  custemername: string;

  @Column("varchar", { name: "custemercode", length: 40 })
  custemercode: string;

  @Column("varchar", { name: "consignee", length: 200 })
  consignee: string;

  @Column("varchar", { name: "address", length: 200 })
  address: string;

  @Column("varchar", { name: "contact", length: 40 })
  contact: string;

  @Column("varchar", { name: "gstin", length: 30 })
  gstin: string;

  @Column("varchar", { name: "certification", length: 50 })
  certification: string;

  @Column("varchar", { name: "nature", length: 50 })
  nature: string;

  @Column("varchar", { name: "product_desc", length: 100 })
  productDesc: string;

  @Column("varchar", { name: "reputed_cust", length: 50 })
  reputedCust: string;

  @Column("varchar", { name: "concern", length: 100 })
  concern: string;

  @Column("varchar", { name: "other_Info", length: 100 })
  otherInfo: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @Column("varchar", { name: "website", nullable: true, length: 250 })
  website: string | null;

  @OneToMany(
    () => Salesinvoice001wb,
    (salesinvoice001wb) => salesinvoice001wb.custmrSlno2
  )
  salesinvoice001wbs: Salesinvoice001wb[];

  setProperties(custemerRegistrationDTO: CustemerRegistrationDTO) {
    this.slNo = custemerRegistrationDTO.slNo;
    this.unitdepartslNo = custemerRegistrationDTO.unitdepartslNo;
    this.custemername = custemerRegistrationDTO.custemername;
    this.consignee = custemerRegistrationDTO.consignee;
    this.custemercode = custemerRegistrationDTO.custemercode;
    this.address = custemerRegistrationDTO.address;
    this.contact = custemerRegistrationDTO.contact;
    this.gstin = custemerRegistrationDTO.gstin;
    this.certification = custemerRegistrationDTO.certification;
    this.nature = custemerRegistrationDTO.nature;
    this.productDesc = custemerRegistrationDTO.productDesc;
    this.reputedCust = custemerRegistrationDTO.reputedCust;
    this.concern = custemerRegistrationDTO.concern;
    this.otherInfo = custemerRegistrationDTO.otherInfo;
    this.website = custemerRegistrationDTO.website;
    this.insertUser = custemerRegistrationDTO.insertUser;
    this.insertDatetime = custemerRegistrationDTO.insertDatetime;
    this.updatedUser = custemerRegistrationDTO.updatedUser;
    this.updatedDatetime = custemerRegistrationDTO.updatedDatetime;
  }
}
