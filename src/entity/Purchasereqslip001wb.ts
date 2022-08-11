import { PurchasereqslipDTO } from "src/dto/Purchasereqslip.dto";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Purchasereqitem001wb } from "./Purchasereqitem001wb";

@Entity("purchasereqslip001wb", { schema: "trims" })
export class Purchasereqslip001wb {
  @PrimaryGeneratedColumn({ type: "smallint", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("datetime", { name: "date" })
  date: Date;

  @Column("varchar", { name: "prs_no", length: 30 })
  prsNo: string;

  @Column("datetime", { name: "po_date" })
  poDate: Date;

  @Column("datetime", { name: "req_date" })
  reqDate: Date;

  @Column("varchar", { name: "po_no", length: 30 })
  poNo: string;

  @Column("varchar", { name: "remarks", length: 100 })
  remarks: string;

  @Column("varchar", { name: "status", nullable: true, length: 255 })
  status: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToMany(
    () => Purchasereqitem001wb,
    (purchasereqitem001wb) => purchasereqitem001wb.purchasereqslip001wbs
  )
  purchasereqitem001wbs: Purchasereqitem001wb[];


  setProperties(purchasereqslipDTO: PurchasereqslipDTO) {
    this.slNo = purchasereqslipDTO.slNo;
    this.unitdepartslNo = purchasereqslipDTO.unitdepartslNo;
    this.date = purchasereqslipDTO.date;
    this.prsNo = purchasereqslipDTO.prsNo;
    this.poDate = purchasereqslipDTO.poDate;
    this.reqDate = purchasereqslipDTO.reqDate;
    this.poNo = purchasereqslipDTO.poNo;
    this.remarks = purchasereqslipDTO.remarks;
    this.status = purchasereqslipDTO.status;
    this.insertUser = purchasereqslipDTO.insertUser;
    this.insertDatetime = purchasereqslipDTO.insertDatetime;
    this.updatedUser = purchasereqslipDTO.updatedUser;
    this.updatedDatetime = purchasereqslipDTO.updatedDatetime;
}
}
