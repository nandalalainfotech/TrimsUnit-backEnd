import { UnitMasterDTO } from "src/dto/usermaster.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department001mb } from "./Department001mb";
import { Unitdeptmaster001mb } from "./Unitdeptmaster001mb";

@Index("deptsl_no", ["deptslNo"], {})
@Entity("unitmaster001mb", { schema: "trims" })
export class Unitmaster001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "deptsl_no" })
  deptslNo: number;

  @Column("varchar", { name: "unit_name", length: 100 })
  unitName: string;

  @Column("varchar", { name: "unit_describtion", length: 200 })
  unitDescribtion: string;

  @Column("char", { name: "status", length: 1 })
  status: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Department001mb,
    (department001mb) => department001mb.unitmaster001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "deptsl_no", referencedColumnName: "slNo" }])
  deptslNo2: Department001mb;

  @OneToMany(
    () => Unitdeptmaster001mb,
    (unitdeptmaster001mb) => unitdeptmaster001mb.unitslNo2
  )
  unitdeptmaster001mbs: Unitdeptmaster001mb[];

  

  setProperties(unitMasterDTO: UnitMasterDTO) {
    this.slNo = unitMasterDTO.slNo;
    this.deptslNo = unitMasterDTO.deptslNo;
    this.unitName = unitMasterDTO.unitName;
    this.status = unitMasterDTO.status;
    this.unitDescribtion = unitMasterDTO.unitDescribtion;
    this.insertUser = unitMasterDTO.insertUser;
    this.insertDatetime = unitMasterDTO.insertDatetime;
    this.updatedUser = unitMasterDTO.updatedUser;
    this.updatedDatetime = unitMasterDTO.updatedDatetime;
}
}
