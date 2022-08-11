import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MachineDTO } from "src/dto/Machine.dto";
import { Machine001mb } from "src/entity/Machine001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { MachineSettingService } from "src/service/machine.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/machines')
export class MachineController {
	constructor(private readonly machineService: MachineSettingService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.machineService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.machineService.downloadExcel(request, response);
    }


	@Post("save")
	create(@Body() machineDTO: MachineDTO): Promise<Machine001mb> {
		return this.machineService.create(machineDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() machineDTO: MachineDTO): Promise<Machine001mb> {
		return this.machineService.update(machineDTO);
	}

    @UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Machine001mb[]> {
		return this.machineService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllSlNoAndMcode')
	findAllSlNoAndMcode(): Promise<Machine001mb[]> {
		return this.machineService.findAllSlNoAndMcode();
	}
	
    @UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Machine001mb> {
		return this.machineService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.machineService.remove(id);
	}

}


