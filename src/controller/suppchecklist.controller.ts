import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SuppChecklistDTO } from "src/dto/Suppchecklist.dto";
import { Suppchecklist001mb } from "src/entity/Suppchecklist001mb";
import { SuppchecklistService } from "src/service/suppchecklist.service";
import { Response } from "express";
import { Request } from "supertest";


var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/supchecklist')
export class SuppchecklistController {
	constructor(private readonly suppchecklistService: SuppchecklistService) { }

    @Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {		
		return await this.suppchecklistService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.suppchecklistService.downloadExcel(request, response);
    }


	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() suppChecklistDTO: SuppChecklistDTO): Promise<Suppchecklist001mb> {
		return this.suppchecklistService.create(suppChecklistDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() suppChecklistDTO: SuppChecklistDTO): Promise<Suppchecklist001mb> {
		return this.suppchecklistService.update(suppChecklistDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Suppchecklist001mb[]> {
		return this.suppchecklistService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllbyActivityId/:activityslno')
	findAllbyBreakDownId(@Param('activityslno') activityslno: number): Promise<Suppchecklist001mb[]> {
		return this.suppchecklistService.findAllbyBreakDownId(activityslno);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.suppchecklistService.remove(slNo);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Suppchecklist001mb> {
		return this.suppchecklistService.findOne(id);
	}
}