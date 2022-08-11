import { Department001mb } from "src/entity/Department001mb";
import { Role001mb } from "src/entity/Role001mb";
import { Unitdeptmaster001mb } from "src/entity/Unitdeptmaster001mb";
import { Unitmaster001mb } from "src/entity/Unitmaster001mb";
import { User001mb } from "src/entity/User001mb";
import { PersonDTO } from "./person.dto";


export class UserDTO extends PersonDTO {
    personId: number;
    unitdepartslNo: number;
    dpslno: number;
    username: string;
    roleid: number;
    password: string;
    status: string;
    email: string;
    securityquestion: string;
    securityanswer: string;
    theme: string | null;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    dpslno2: Department001mb;
    role: Role001mb;
    unitdepartslNo2: Unitdeptmaster001mb;


    setProperties(user001mb: User001mb) {
        this.personId = user001mb.personId;
        this.unitdepartslNo = user001mb.unitdepartslNo;
        this.firstname = user001mb.person.firstname;
        this.lastname = user001mb.person.lastname;
        this.age = user001mb.person.age;
        this.dob = user001mb.person.dob;
        this.sex = user001mb.person.sex;
        this.maritalstatus = user001mb.person.maritalstatus;
        this.bloodgroup = user001mb.person.bloodgroup;
        this.address1 = user001mb.person.address1;
        this.address2 = user001mb.person.address2;
        this.address3 = user001mb.person.address3;
        this.religion = user001mb.person.religion;
        this.city = user001mb.person.city;
        this.state = user001mb.person.state;
        this.country = user001mb.person.country;
        this.zipcode = user001mb.person.zipcode;
        this.mobileno = user001mb.person.mobileno;
        this.workphoneno = user001mb.person.workphoneno;
        this.homephoneno = user001mb.person.homephoneno;
        this.primaryemail = user001mb.person.primaryemail;
        this.secondaryemail = user001mb.person.secondaryemail;
        this.occupationtype = user001mb.person.occupationtype;
        this.insertUser = user001mb.person.insertUser;
        this.insertDatetime = user001mb.person.insertDatetime;
        this.updatedUser = user001mb.person.updatedUser;
        this.updatedDatetime = user001mb.person.updatedDatetime;
        this.personId =  user001mb.person.personId;
        this.dpslno = user001mb.dpslno;
        this.username = user001mb.username;
        this.roleid = user001mb.roleid;
        this.password = user001mb.password;
        this.status = user001mb.status;
        this.email = user001mb.email;
        this.securityquestion = user001mb.securityquestion;
        this.securityanswer = user001mb.securityanswer;
        this.theme = user001mb.theme;
        this.insertUser = user001mb.insertUser;
        this.insertDatetime = user001mb.insertDatetime;
        this.updatedUser = user001mb.updatedUser;
        this.updatedDatetime = user001mb.updatedDatetime;
        this.dpslno2 = user001mb.dpslno2;
        this.role = user001mb.role;
        this.unitdepartslNo2 = user001mb.unitdepartslNo2;
    }
}
