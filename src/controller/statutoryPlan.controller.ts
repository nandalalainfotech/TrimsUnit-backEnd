import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { StatutoryPlanDTO } from "src/dto/statutory.dto";
import { Statutory001wb } from "src/entity/Statutory001wb";
import { StatutoryPlanService } from "src/service/statutoryPlan.service";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/statutory')
export class StatutoryPlanController {
	constructor(private readonly statutoryPlanService: StatutoryPlanService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.statutoryPlanService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.statutoryPlanService.downloadExcel(request, response);
    }

	@UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() statutoryPlanDTO: StatutoryPlanDTO) {
		return this.statutoryPlanService.create(statutoryPlanDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() statutoryPlanDTO: StatutoryPlanDTO) {
		return this.statutoryPlanService.update( statutoryPlanDTO);
	}
	

	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Statutory001wb[]> {
		return this.statutoryPlanService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.statutoryPlanService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Statutory001wb> {
		return this.statutoryPlanService.findOne(id);
	}


}