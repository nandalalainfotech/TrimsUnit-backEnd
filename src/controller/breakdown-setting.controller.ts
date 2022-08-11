import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { BreakdownDTO } from "src/dto/breakdown.dto";
import { Breakdown001mb } from "src/entity/Breakdown001mb";
import { BreakdownService } from "src/service/breakdown-setting.service";
import { Request } from "supertest";
import { Response } from "express";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/breakdown')
export class BreakdownController {
	constructor(private readonly breakdownService: BreakdownService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		
		return await this.breakdownService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
		return await this.breakdownService.downloadExcel(request, response);
    }



	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() breakdownDTO: BreakdownDTO): Promise<Breakdown001mb> {
		return this.breakdownService.create(breakdownDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() breakdownDTO: BreakdownDTO): Promise<Breakdown001mb> {
		return this.breakdownService.update(breakdownDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Breakdown001mb[]> {
		return this.breakdownService.findAll();
	}
	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.breakdownService.remove(slNo);
	}
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Breakdown001mb> {
		return this.breakdownService.findOne(id);
	}
}