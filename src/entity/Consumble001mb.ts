import { ConsumbleDTO } from "src/dto/comsumble.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Purchasereqitem001wb } from "./Purchasereqitem001wb";

@Entity("consumble001mb", { schema: "trims" })
export class Consumble001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("varchar", { name: "consmno", length: 200 })
  consmno: string;

  @Column("varchar", { name: "consname", length: 200 })
  consname: string;

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



  setProperties(consumbleDTO: ConsumbleDTO) {
    this.slNo = consumbleDTO.slNo;
    this.unitdepartslNo = consumbleDTO.unitdepartslNo;
    this.consmno = consumbleDTO.consmno;
    this.consname = consumbleDTO.consname;
    this.splan = consumbleDTO.splan;
    this.descrip=consumbleDTO.descrip;
    this.unitamount=consumbleDTO.unitamount;
    this.uom=consumbleDTO.uom;
    this.gst=consumbleDTO.gst;
    this.qunty=consumbleDTO.qunty;
    this.hsn = consumbleDTO.hsn;
    this.insertUser = consumbleDTO.insertUser;
    this.insertDatetime = consumbleDTO.insertDatetime;
    this.updatedUser = consumbleDTO.updatedUser;
    this.updatedDatetime = consumbleDTO.updatedDatetime;


  }
}
