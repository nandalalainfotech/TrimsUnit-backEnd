import { Role001mb } from "src/entity/Role001mb";
import { BaseDTO } from "./Base.dto";

export class RoleDTO extends BaseDTO {
	id: number;
	unitdepartslNo: number;
	rolename: string;
	status: string;
	insertUser: string;
	insertDatetime: Date;
	updatedUser: string | null;
	updatedDatetime: Date | null;

	setProperties(role001mb: Role001mb) {
		this.id = role001mb.id;
		this.unitdepartslNo = role001mb.unitdepartslNo;
		this.rolename = role001mb.rolename;
		this.insertUser = role001mb.insertUser;
		this.insertDatetime = role001mb.insertDatetime;
		this.updatedUser = role001mb.updatedUser;
		this.updatedDatetime = role001mb.updatedDatetime;
	}
}
