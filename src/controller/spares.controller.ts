import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SparesDTO } from "src/dto/spares.dto";
import { Spares001mb } from "src/entity/Spares001mb";
import { SpareService } from "src/service/spares.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/spare')
export class SparesController {
	constructor(private readonly spareService: SpareService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.spareService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.spareService.downloadExcel(request, response);
    }

	@Get('findAll')
	findAll(): Promise<Spares001mb[]> {
		return this.spareService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() sparesDTO: SparesDTO): Promise<Spares001mb> {
		return this.spareService.create(sparesDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() sparesDTO: SparesDTO): Promise<Spares001mb> {
		return this.spareService.update(sparesDTO);
	}

    @UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Spares001mb> {
		return this.spareService.findOne(id);
	}
	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.spareService.remove(id);
	}
}