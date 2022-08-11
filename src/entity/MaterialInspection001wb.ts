import { MaterialinspectionDTO } from "src/dto/Materialinspection.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("materialinspection001wb", { schema: "trims" })
export class Materialinspection001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("varchar", { name: "iirno", length: 250 })
  iirno: string;

  @Column("datetime", { name: "cdate", nullable: true })
  cdate: Date | null;

  @Column("varchar", { name: "scname", length: 250 })
  scname: string;

  @Column("varchar", { name: "dcno", length: 250 })
  dcno: string;

  @Column("varchar", { name: "refno", length: 250 })
  refno: string;

  @Column("datetime", { name: "pdate", nullable: true })
  pdate: Date | null;

  @Column("varchar", { name: "cponumber", length: 250 })
  cponumber: string;

  @Column("varchar", { name: "sponumber", length: 250 })
  sponumber: string;

  @Column("varchar", { name: "grnumber", length: 150 })
  grnumber: string;

  @Column("varchar", { name: "remark", length: 150 })
  remark: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;


  setProperties(materialinspectionDTO: MaterialinspectionDTO) {
    this.slNo = materialinspectionDTO.slNo;
    this.unitdepartslNo = materialinspectionDTO.unitdepartslNo;
    this.iirno = materialinspectionDTO.iirno;
    this.cdate = materialinspectionDTO.cdate;
    this.scname = materialinspectionDTO.scname;
    this.dcno = materialinspectionDTO.dcno;
    this.refno = materialinspectionDTO.refno;
    this.pdate = materialinspectionDTO.pdate;
    this.cponumber = materialinspectionDTO.cponumber;
    this.sponumber = materialinspectionDTO.sponumber;
    this.grnumber = materialinspectionDTO.grnumber;
    this.remark = materialinspectionDTO.remark;
    this.insertUser = materialinspectionDTO.insertUser;
    this.insertDatetime = materialinspectionDTO.insertDatetime;
    this.updatedUser = materialinspectionDTO.updatedUser;
    this.updatedDatetime = materialinspectionDTO.updatedDatetime;
  }
}
