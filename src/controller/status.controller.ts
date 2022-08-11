import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { StatusDTO } from "src/dto/Status.dto";
import { Status001mb } from "src/entity/Status001mb";
import { StatusService } from "src/service/status.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/status')
export class StatusController {
	constructor(private readonly statusService: StatusService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.statusService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.statusService.downloadExcel(request, response);
    }


	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() statusDTO: StatusDTO): Promise<Status001mb> {
		return this.statusService.create(statusDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() statusDTO: StatusDTO): Promise<Status001mb> {
		return this.statusService.update(statusDTO);
	}
    @UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Status001mb[]> {
		return this.statusService.findAll();
	}

    @UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Status001mb> {
		return this.statusService.findOne(id);
	}
	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.statusService.remove(id);
	}
}