import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PreventiveactionDTO } from "src/dto/preventiveaction.dto";
import { Preventiveaction001mb } from "src/entity/Preventiveaction001mb";
import { PreventiveactionService } from "src/service/preventiveaction-setting.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/preventiveaction')
export class PreventiveactionController {
	constructor(private readonly preventiveactionService: PreventiveactionService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.preventiveactionService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.preventiveactionService.downloadExcel(request, response);
    }







	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() preventiveactionDTO: PreventiveactionDTO): Promise<Preventiveaction001mb> {
		return this.preventiveactionService.create(preventiveactionDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() preventiveactionDTO: PreventiveactionDTO): Promise<Preventiveaction001mb> {
		return this.preventiveactionService.update(preventiveactionDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Preventiveaction001mb[]> {
		return this.preventiveactionService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllbyRootCauseId/:rcslno')
	findAllbyRootCauseId(@Param('rcslno') rcslno: number): Promise<Preventiveaction001mb[]> {
		return this.preventiveactionService.findAllbyRootCauseId(rcslno);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.preventiveactionService.remove(slNo);
	}
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Preventiveaction001mb> {
		return this.preventiveactionService.findOne(id);
	}
}