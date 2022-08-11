import { PaymentDTO } from "src/dto/Payment.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Salesorder001wb } from "./Salesorder001wb";

@Index("saleorder_slno", ["saleorderSlno"], {})
@Entity("payment001wb", { schema: "trims" })
export class Payment001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("int", { name: "saleorder_slno" })
  saleorderSlno: number;

  @Column({ name: "pay_date", type: "date" })
  payDate: Date;

  @Column("varchar", { name: "pay_status", length: 20 })
  payStatus: string;

  @Column({ name: "due_date", type:"date" })
  dueDate: Date;

  @Column("int", { name: "gst_no" })
  gstNo: number;

  @Column("varchar", { name: "gst_percent", length: 30 })
  gstPercent: string;

  @Column("int", { name: "gst_amount" })
  gstAmount: number;

  @Column("int", { name: "total_amount" })
  totalAmount: number;

  @Column("varchar", { name: "remarks", length: 100 })
  remarks: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Salesorder001wb,
    (salesorder001wb) => salesorder001wb.payment001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "saleorder_slno", referencedColumnName: "slNo" }])
  saleorderSlno2: Salesorder001wb;

  setProperties(paymentDTO: PaymentDTO) {
    this.slNo = paymentDTO.slNo;
    this.unitdepartslNo = paymentDTO.unitdepartslNo;
    this.saleorderSlno = paymentDTO.saleorderSlno;
    this.payDate = new Date(paymentDTO.payDate);
    this.payStatus = paymentDTO.payStatus;
    this.dueDate = new Date(paymentDTO.dueDate);
    this.gstNo = paymentDTO.gstNo;
    this.gstPercent = paymentDTO.gstPercent;
    this.gstAmount = paymentDTO.gstAmount;
    this.totalAmount = paymentDTO.totalAmount;
    this.remarks = paymentDTO.remarks;
    this.insertUser = paymentDTO.insertUser;
    this.insertDatetime = paymentDTO.insertDatetime;
    this.updatedUser = paymentDTO.updatedUser;
    this.updatedDatetime = paymentDTO.updatedDatetime;
  }
}
