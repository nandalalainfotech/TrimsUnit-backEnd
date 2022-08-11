import { PartDTO } from "src/dto/Part.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Purchasereqitem001wb } from "./Purchasereqitem001wb";

@Entity("part001mb", { schema: "trims" })
export class Part001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("varchar", { name: "partno", length: 200 })
  partno: string;

  @Column("varchar", { name: "partname", length: 200 })
  partname: string;

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


  setProperties(partDTO: PartDTO) {
    this.slNo = partDTO.slNo;
    this.unitdepartslNo = partDTO.unitdepartslNo;
    this.partno = partDTO.partno;
    this.partname = partDTO.partname;
    this.hsn = partDTO.hsn;
    this.splan = partDTO.splan;
    this.descrip=partDTO.descrip;
    this.unitamount=partDTO.unitamount;
    this.uom=partDTO.uom;
    this.gst=partDTO.gst;
    this.qunty=partDTO.qunty;
    this.insertUser = partDTO.insertUser;
    this.insertDatetime = partDTO.insertDatetime;
    this.updatedUser = partDTO.updatedUser;
    this.updatedDatetime = partDTO.updatedDatetime;
  }
}