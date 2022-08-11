import { SupplierQuotationDTO } from "src/dto/supplierquotation.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Supplierquotationitems001wb } from "./Supplierquotationitems001wb";
import { Supplierregistration001mb } from "./Supplierregistration001mb";

@Index("supplier_slno", ["supplierSlno"], {})
@Entity("supplierquotation001wb", { schema: "trims" })
export class Supplierquotation001wb {
  @PrimaryGeneratedColumn({ type: "smallint", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("int", { name: "supplier_slno" })
  supplierSlno: number;

  @Column("varchar", { name: "supliername", length: 150 })
  supliername: string;

  @Column("varchar", { name: "supliertype", length: 150 })
  supliertype: string;

  @Column("varchar", { name: "address", length: 150 })
  address: string;

  @Column("varchar", { name: "quotation_no", length: 150 })
  quotationNo: string;

  @Column("datetime", { name: "quotation_date" })
  quotationDate: Date;

  @Column("datetime", { name: "validity" })
  validity: Date;

  @Column("varchar", { name: "person_name", nullable: true, length: 30 })
  personName: string | null;

  @Column("varchar", { name: "desgnation", length: 100 })
  desgnation: string;

  @Column("int", { name: "mnumber" })
  mnumber: number;

  @Column("int", { name: "mobile" })
  mobile: number;

  @Column("varchar", { name: "level", length: 30 })
  level: string;

  @Column("varchar", { name: "department", length: 30 })
  department: string;

  @Column("varchar", { name: "mailid", length: 30 })
  mailid: string;

  @Column("varchar", { name: "terms_condition", length: 100 })
  termsCondition: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @Column("varchar", { name: "status", nullable: true, length: 200 })
  status: string | null;

  @Column("varchar", { name: "remarks", nullable: true, length: 200 })
  remarks: string | null;

  @Column("varchar", { name: "prsno", nullable: true, length: 200 })
  prsno: string | null;

  @ManyToMany(
    () => Supplierquotationitems001wb,
    (supplierquotationitems001wb) =>
      supplierquotationitems001wb.supplierquotation001wbs
  )
  supplierquotationitems001wbs: Supplierquotationitems001wb[];

  @ManyToOne(
    () => Supplierregistration001mb,
    (supplierregistration001mb) =>
      supplierregistration001mb.supplierquotation001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "supplier_slno", referencedColumnName: "slNo" }])
  supplierSlno2: Supplierregistration001mb;


  setProperties(supplierQuotationDTO: SupplierQuotationDTO) {
    this.slNo = supplierQuotationDTO.slNo;
    this.unitdepartslNo = supplierQuotationDTO.unitdepartslNo;
    this.supplierSlno = supplierQuotationDTO.supplierSlno;
    this.supliername = supplierQuotationDTO.supliername;
    this.supliertype = supplierQuotationDTO.supliertype;
    this.quotationNo = supplierQuotationDTO.quotationNo;
    this.address = supplierQuotationDTO.address;
    this.quotationDate = new Date(supplierQuotationDTO.quotationDate);
    this.validity = new Date(supplierQuotationDTO.validity);
    this.personName = supplierQuotationDTO.personName;
    this.desgnation = supplierQuotationDTO.desgnation;
    this.mnumber = supplierQuotationDTO.mnumber;
    this.mobile = supplierQuotationDTO.mobile;
    this.level = supplierQuotationDTO.level;
    this.department = supplierQuotationDTO.department;
    this.mailid = supplierQuotationDTO.mailid;
    this.prsno = supplierQuotationDTO.prsno;
    this.termsCondition = supplierQuotationDTO.termsCondition;

    // this.filename = supplierQuotationDTO.filename;
    // this.filepath = supplierQuotationDTO.filepath;
    // this.originalfilename = supplierQuotationDTO.originalfilename;
    this.insertUser = supplierQuotationDTO.insertUser;
    this.insertDatetime = supplierQuotationDTO.insertDatetime;
    this.updatedUser = supplierQuotationDTO.updatedUser;
    this.updatedDatetime = supplierQuotationDTO.updatedDatetime;
    this.status = supplierQuotationDTO.status;
    this.remarks = supplierQuotationDTO.remarks;
  }
}
