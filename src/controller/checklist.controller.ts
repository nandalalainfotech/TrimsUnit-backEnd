import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChecklistDTO } from "src/dto/Checklist.dto";
import { Checklist001mb } from "src/entity/Checklist001mb";
import { ChecklistSettingService } from "src/service/checklist.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/checklist')
export class ChecklistController {
	constructor(private readonly checklistService: ChecklistSettingService) { }

	
	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.checklistService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.checklistService.downloadExcel(request, response);
    }



	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() checklistDTO: ChecklistDTO): Promise<Checklist001mb> {
		return this.checklistService.create(checklistDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() checklistDTO: ChecklistDTO): Promise<Checklist001mb> {
		return this.checklistService.update(checklistDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Checklist001mb[]> {
		return this.checklistService.findAll();
	}
	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.checklistService.remove(slNo);
	}
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Checklist001mb> {
		return this.checklistService.findOne(id);
	}
}