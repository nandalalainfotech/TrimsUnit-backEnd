import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PreventivePlanDTO } from "src/dto/preventiveplan.dto";
import { Preventiveplan001wb } from "src/entity/Preventiveplan001wb";
import { PreventivePlanService } from "src/service/preventiveplan.service";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/preventiveplan')
export class PreventivePlanController {
	constructor(private readonly preventivePlanService: PreventivePlanService) { }

	@Get('findNotificationAll')
	findNotificationAll(): Promise<Preventiveplan001wb[]> {
		return this.preventivePlanService.findNotificationAll();
	}

	@Post("save")
	create(@Body() preventivePlanDTO: PreventivePlanDTO): Promise<Preventiveplan001wb> {
		return this.preventivePlanService.create(preventivePlanDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() preventivePlanDTO: PreventivePlanDTO): Promise<Preventiveplan001wb> {
		return this.preventivePlanService.update(preventivePlanDTO);
	}

	@Get('findAll')
	findAll(): Promise<Preventiveplan001wb[]> {
		return this.preventivePlanService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllByMachineId/:mslno')
	findAllByMachineId(@Param('mslno') mslno: number): Promise<Preventiveplan001wb[]> {
		return this.preventivePlanService.findAllByMachineId(mslno);
	}
	@UseGuards(JwtAuthGuard)
	@Get('findAllByDashboard')
	findAllByDashboard(): Promise<any> {
		return this.preventivePlanService.findAllByDashboard();
	}


	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Preventiveplan001wb> {
		return this.preventivePlanService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.preventivePlanService.remove(id);
	}

	@Get('pdf/:mslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.preventivePlanService.downloadPdf(mslno, request, response);
	}

	// @UseGuards(JwtAuthGuard)
	@Get('excel/:mslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {

		return await this.preventivePlanService.downloadExcel(mslno, request, response);
	}
}