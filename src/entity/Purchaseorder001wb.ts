import { PurchaseorderDTO } from "src/dto/Purchaseorder.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orderitem001wb } from "./Orderitem001wb";
import { Supplierregistration001mb } from "./Supplierregistration001mb";

@Index("suplier_slno", ["suplierSlno"], {})
@Entity("purchaseorder001wb", { schema: "trims" })
export class Purchaseorder001wb {
  @PrimaryGeneratedColumn({ type: "smallint", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("int", { name: "suplier_slno" })
  suplierSlno: number;

  @Column("varchar", { name: "suplierName", length: 50 })
  suplierName: string;

  @Column("varchar", { name: "suplieraddress", length: 50 })
  suplieraddress: string;

  @Column("varchar", { name: "pono", length: 50 })
  pono: string;

  @Column("datetime", { name: "date" })
  date: Date;

  @Column("varchar", { name: "prsno", nullable: true, length: 50 })
  prsno: string | null;

  @Column("varchar", { name: "qno", length: 50 })
  qno: string;

  @Column("varchar", { name: "dispatch_through", nullable: true, length: 50 })
  dispatchThrough: string | null;

  @Column("varchar", { name: "destination", length: 50 })
  destination: string;

  @Column("varchar", { name: "terms_delivery", length: 100 })
  termsDelivery: string;

  @Column("varchar", { name: "supplier_from", length: 150 })
  supplierFrom: string;

  @Column("datetime", { name: "due_on" })
  dueOn: Date;

  @Column("int", { name: "status_slno", nullable: true })
  statusSlno: number | null;

  @Column("varchar", { name: "remarks", nullable: true, length: 200 })
  remarks: string | null;

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

  @ManyToMany(
    () => Orderitem001wb,
    (orderitem001wb) => orderitem001wb.purchaseorder001wbs
  )
  orderitem001wbs: Orderitem001wb[];


  
 setProperties(purchaseorderDTO: PurchaseorderDTO) {
    this.slNo = purchaseorderDTO.slNo;
    this.unitdepartslNo = purchaseorderDTO.unitdepartslNo;
    this.suplierSlno = purchaseorderDTO.suplierSlno;
    this.suplierName = purchaseorderDTO.suplierName;
    this.suplieraddress = purchaseorderDTO.suplieraddress;
    this.date = new Date(purchaseorderDTO.date);
    this.prsno = purchaseorderDTO.prsno;
    this.pono = purchaseorderDTO.pono;
    this.remarks=purchaseorderDTO.remarks;
    this.statusSlno=purchaseorderDTO.statusSlno;
    this.qno = purchaseorderDTO.qno;
    this.dispatchThrough = purchaseorderDTO.dispatchThrough;
    this.destination = purchaseorderDTO.destination;
    this.termsDelivery = purchaseorderDTO.termsDelivery;
    this.supplierFrom = purchaseorderDTO.supplierFrom;
    this.dueOn = purchaseorderDTO.dueOn;
    this.insertUser = purchaseorderDTO.insertUser;
    this.insertDatetime = purchaseorderDTO.insertDatetime;
    this.updatedUser = purchaseorderDTO.updatedUser;
    this.updatedDatetime = purchaseorderDTO.updatedDatetime;
    this.status = purchaseorderDTO.status;
  }
}
