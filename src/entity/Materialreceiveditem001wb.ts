import { MaterialreceiveditemDTO } from "src/dto/materialreceiveditem.dto";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Materialinward001wb } from "./Materialinward001wb";

@Entity("materialreceiveditem001wb", { schema: "trims" })
export class Materialreceiveditem001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("varchar", { name: "itemcode", length: 250 })
  itemcode: string;

  @Column("varchar", { name: "itemname", length: 250 })
  itemname: string;

  @Column("varchar", { name: "qunty", length: 250 })
  qunty: string;

  @Column("varchar", { name: "unitrate", length: 250 })
  unitrate: string;

  @Column("int", { name: "totalamount" })
  totalamount: number;

  @Column("int", { name: "received_qty" })
  receivedQty: number;

  @Column("int", { name: "accepted_qty" })
  acceptedQty: number;

  @Column("int", { name: "rejected_qty" })
  rejectedQty: number;

  @Column("int", { name: "outstanding" })
  outstanding: number;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToMany(
    () => Materialinward001wb,
    (materialinward001wb) => materialinward001wb.materialreceiveditem001wbs
  )
  @JoinTable({
    name: "materialitem001mb",
    joinColumns: [
      { name: "materialreceiveditem001wb", referencedColumnName: "slNo" },
    ],
    inverseJoinColumns: [
      { name: "materialinward001wb", referencedColumnName: "slNo" },
    ],
    schema: "trims",
  })
  materialinward001wbs: Materialinward001wb[];

  setProperties(materialreceiveditemDTO: MaterialreceiveditemDTO) {
    this.slNo = materialreceiveditemDTO.slNo;
    this.unitdepartslNo = materialreceiveditemDTO.unitdepartslNo;
    this.itemcode = materialreceiveditemDTO.itemcode;
    this.itemname = materialreceiveditemDTO.itemname;
    this.qunty = materialreceiveditemDTO.qunty;
    this.unitrate = materialreceiveditemDTO.unitrate;
    this.totalamount = materialreceiveditemDTO.totalamount;
    this.receivedQty = materialreceiveditemDTO.receivedQty;
    this.acceptedQty = materialreceiveditemDTO.acceptedQty;
    this.rejectedQty = materialreceiveditemDTO.rejectedQty;
    this.outstanding = materialreceiveditemDTO.outstanding;
    this.insertUser = materialreceiveditemDTO.insertUser;
    this.insertDatetime = materialreceiveditemDTO.insertDatetime;
    this.updatedUser = materialreceiveditemDTO.updatedUser;
    this.updatedDatetime = materialreceiveditemDTO.updatedDatetime;


  }
}
