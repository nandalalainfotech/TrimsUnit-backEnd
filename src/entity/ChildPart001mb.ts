import { ChildPartDTO } from "src/dto/Childpart.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Purchasereqitem001wb } from "./Purchasereqitem001wb";

@Entity("childpart001mb", { schema: "trims" })
export class Childpart001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("varchar", { name: "cpartno", length: 200 })
  cpartno: string;

  @Column("varchar", { name: "cpartname", length: 200 })
  cpartname: string;

  @Column("varchar", { name: "splan", length: 200 })
  splan: string;

  @Column("varchar", { name: "descrip", length: 250 })
  descrip: string;

  @Column("varchar", { name: "qunty", length: 250 })
  qunty: string;

  @Column("int", { name: "unitamount" })
  unitamount: number;

  @Column("varchar", { name: "uom", length: 250 })
  uom: string;

  @Column("int", { name: "gst" })
  gst: number;

  @Column("varchar", { name: "HSN", length: 250 })
  hsn: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;




  setProperties(childPartDTO: ChildPartDTO) {
    this.slNo = childPartDTO.slNo;
    this.unitdepartslNo = childPartDTO.unitdepartslNo;
    this.cpartno = childPartDTO.cpartno;
    this.cpartname = childPartDTO.cpartname;
    this.splan = childPartDTO.splan;
    this.descrip=childPartDTO.descrip;
    this.unitamount=childPartDTO.unitamount;
    this.uom=childPartDTO.uom;
    this.gst=childPartDTO.gst;
    this.hsn=childPartDTO.hsn;
    this.qunty=childPartDTO.qunty;
    this.insertUser = childPartDTO.insertUser;
    this.insertDatetime = childPartDTO.insertDatetime;
    this.updatedUser = childPartDTO.updatedUser;
    this.updatedDatetime = childPartDTO.updatedDatetime;
  }
}
