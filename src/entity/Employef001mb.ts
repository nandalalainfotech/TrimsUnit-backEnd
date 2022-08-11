import { EmployefDTO } from "src/dto/employef.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Firstaidwb001 } from "./Firstaidwb001";

@Entity("employef001mb", { schema: "trims" })
export class Employef001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("varchar", { name: "fa_no", length: 50 })
  faNo: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  
  // @OneToMany(() => Firstaidwb001, (firstaidwb001) => firstaidwb001.eslno2)
  // firstaidwbs: Firstaidwb001[];


  setProperties(employefDTO: EmployefDTO) {
    this.slNo = employefDTO.slNo;
    this.unitdepartslNo = employefDTO.unitdepartslNo;
    this.faNo = employefDTO.faNo;
    this.insertUser = employefDTO.insertUser;
    this.insertDatetime = employefDTO.insertDatetime;
    this.updatedUser = employefDTO.updatedUser;
    this.updatedDatetime = employefDTO.updatedDatetime;
  }
}
