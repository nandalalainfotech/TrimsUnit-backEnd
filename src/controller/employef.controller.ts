import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { EmployefDTO } from "src/dto/employef.dto";
import { Employef001mb } from "src/entity/Employef001mb";
import { EmployeFecilityService } from "src/service/employef.service";
import { Request } from "supertest";
import { Response } from "express";


var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/employef')
export class EmployeFecilityController {
	constructor(private readonly employeFecilityService: EmployeFecilityService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.employeFecilityService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
		return await this.employeFecilityService.downloadExcel(request, response);
    }



	@Post("save")
	create(@Body() employefDTO: EmployefDTO): Promise<Employef001mb> {
		return this.employeFecilityService.create(employefDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() employefDTO: EmployefDTO): Promise<Employef001mb> {
		return this.employeFecilityService.update(employefDTO);
	}

    @UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Employef001mb[]> {
		return this.employeFecilityService.findAll();
	}

	
	
    @UseGuards(JwtAuthGuard)
	@Get(':slNo')
	findOne(@Param('slNo') slNo: number): Promise<Employef001mb> {
		return this.employeFecilityService.findOne(slNo);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.employeFecilityService.remove(id);
	}
}