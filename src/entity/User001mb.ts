import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Person001mb } from "./Person001mb";
import { Department001mb } from "./Department001mb";
import { Role001mb } from "./Role001mb";
import { UserDTO } from "src/dto/User.dto";
import { Unitmaster001mb } from "./Unitmaster001mb";
import { Unitdeptmaster001mb } from "./Unitdeptmaster001mb";

@Index("dpslno", ["dpslno"], {})
@Index("roleid", ["roleid"], {})
@Entity("user001mb", { schema: "trims" })
export class User001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "person_id" })
  personId: number;

  // @Column("int", { name: "unitsl_no" })
  // unitslNo: number;

  @Column("int", { name: "dpslno" })
  dpslno: number;

  @Column("int", { name: "unitdepartsl_no" })
  unitdepartslNo: number;

  @Column("int", { name: "roleid" })
  roleid: number;

  @Column("varchar", { name: "username", length: 40 })
  username: string;

  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @Column("char", { name: "status", length: 1 })
  status: string;

  @Column("varchar", { name: "email", length: 30 })
  email: string;

  @Column("varchar", { name: "securityquestion", length: 250 })
  securityquestion: string;

  @Column("varchar", { name: "securityanswer", length: 250 })
  securityanswer: string;

  @Column("varchar", {
    name: "theme",
    nullable: true,
    length: 10,
    default: () => "'#286090'",
  })
  theme: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToOne(() => Person001mb, (person001mb) => person001mb.user001mb, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "person_id", referencedColumnName: "personId" }])
  person: Person001mb;

  @ManyToOne(
    () => Department001mb,
    (department001mb) => department001mb.user001mbs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "dpslno", referencedColumnName: "slNo" }])
  dpslno2: Department001mb;

  @ManyToOne(() => Role001mb, (role001mb) => role001mb.user001mbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "roleid", referencedColumnName: "id" }])
  role: Role001mb;

  // @ManyToOne(
  //   () => Unitmaster001mb,
  //   (unitmaster001mb) => unitmaster001mb.user001mbs,
  //   { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  // )
  // @JoinColumn([{ name: "unitsl_no", referencedColumnName: "slNo" }])
  // unitslNo2: Unitmaster001mb;

  @ManyToOne(
    () => Unitdeptmaster001mb,
    (unitdeptmaster001mb) => unitdeptmaster001mb.user001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "unitdepartsl_no", referencedColumnName: "slNo" }])
  unitdepartslNo2: Unitdeptmaster001mb;

  setProperties(userDTO: UserDTO) {
    this.personId = userDTO.personId;
    this.unitdepartslNo = userDTO.unitdepartslNo;
    this.dpslno = userDTO.dpslno;
    this.username = userDTO.username;
    this.roleid = userDTO.roleid;
    this.password = userDTO.password;
    this.status = userDTO.status;
    this.email = userDTO.email;
    this.securityquestion = userDTO.securityquestion;
    this.securityanswer = userDTO.securityanswer;
    this.theme = userDTO.theme;
    this.insertUser = userDTO.insertUser;
    this.insertDatetime = userDTO.insertDatetime;
    this.updatedUser = userDTO.updatedUser;
    this.updatedDatetime = userDTO.updatedDatetime;
    
  }
}
