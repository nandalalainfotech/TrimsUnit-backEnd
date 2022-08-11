import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleDTO } from 'src/dto/Role.dto';
import { Role001mb } from 'src/entity/Role001mb';
import { RoleService } from 'src/service/Role.service';



@Controller('/testandreportstudio/api/role')
export class RoleController {
	constructor(private readonly roleService: RoleService ) { }

	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body()roleDTO: RoleDTO): Promise<Role001mb> {
		return this.roleService.create(roleDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body()roleDTO: RoleDTO): Promise<Role001mb> {
		return this.roleService.update(roleDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Role001mb[]> {
		return this.roleService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Role001mb> {
		return this.roleService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.roleService.remove(id);
	}
}

