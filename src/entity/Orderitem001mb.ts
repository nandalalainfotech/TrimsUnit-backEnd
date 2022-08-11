import { OrderItemMbDTO } from "src/dto/orderitems.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orderitem001wb } from "./Orderitem001wb";
import { Purchasereqitem001wb } from "./Purchasereqitem001wb";

@Entity("orderitem001mb", { schema: "trims" })
export class Orderitem001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("varchar", { name: "itemcode", length: 250 })
  itemcode: string;

  @Column("varchar", { name: "itemname", length: 250 })
  itemname: string;

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

 


  setProperties(orderItemMbDTO: OrderItemMbDTO) {
    this.slNo=orderItemMbDTO.slNo;
    this.unitdepartslNo=orderItemMbDTO.unitdepartslNo;
    this.itemcode=orderItemMbDTO.itemcode;
    this.itemname=orderItemMbDTO.itemname;
    this.descrip=orderItemMbDTO.descrip;
    this.unitamount=orderItemMbDTO.unitamount;
    this.uom=orderItemMbDTO.uom;
    this.gst=orderItemMbDTO.gst;
    this.hsn=orderItemMbDTO.hsn;
    this.qunty=orderItemMbDTO.qunty;
    this.insertUser = orderItemMbDTO.insertUser;
    this.insertDatetime = orderItemMbDTO.insertDatetime;
    this.updatedUser = orderItemMbDTO.updatedUser;
    this.updatedDatetime = orderItemMbDTO.updatedDatetime;


}
}
