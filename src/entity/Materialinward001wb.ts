import { MaterialinwardDTO } from "src/dto/Materialinward.dto";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Materialreceiveditem001wb } from "./Materialreceiveditem001wb";

@Entity("materialinward001wb", { schema: "trims" })
export class Materialinward001wb {
  @PrimaryGeneratedColumn({ type: "smallint", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("int", { name: "purchse_slno" })
  purchseSlno: number;

  @Column("datetime", { name: "date" })
  date: Date;

  @Column("varchar", { name: "dc_no", length: 30 })
  dcNo: string;

  @Column("varchar", { name: "invoiceno", length: 100 })
  invoiceno: string;

  @Column("datetime", { name: "dc_date" })
  dcDate: Date;

  @Column("varchar", { name: "supliername", length: 100 })
  supliername: string;

  @Column("varchar", { name: "grm", length: 100 })
  grm: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToMany(
    () => Materialreceiveditem001wb,
    (materialreceiveditem001wb) =>
      materialreceiveditem001wb.materialinward001wbs
  )
  materialreceiveditem001wbs: Materialreceiveditem001wb[];

  
  setProperties(materialinwardDTO: MaterialinwardDTO) {
    this.slNo = materialinwardDTO.slNo;
    this.unitdepartslNo = materialinwardDTO.unitdepartslNo;
    this.purchseSlno = materialinwardDTO.purchseSlno;
    this.date = new Date(materialinwardDTO.date);
    this.dcNo = materialinwardDTO.dcNo;
    this.invoiceno = materialinwardDTO.invoiceno;
    this.dcDate = new Date(materialinwardDTO.dcDate);
    this.supliername = materialinwardDTO.supliername;
    this.grm = materialinwardDTO.grm;
    this.insertUser = materialinwardDTO.insertUser;
    this.insertDatetime = materialinwardDTO.insertDatetime;
    this.updatedUser = materialinwardDTO.updatedUser;
    this.updatedDatetime = materialinwardDTO.updatedDatetime;
  }
}
