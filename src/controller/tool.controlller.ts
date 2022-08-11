import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ToolDTO } from "src/dto/Tool.dto";
import { Tool001mb } from "src/entity/Tool001mb";
import { ToolService } from "src/service/tool.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/tool')
export class ToolController {
	constructor(private readonly toolService: ToolService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.toolService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
		return await this.toolService.downloadExcel(request, response);
    }


	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() toolDTO: ToolDTO): Promise<Tool001mb> {
		return this.toolService.create(toolDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() toolDTO: ToolDTO): Promise<Tool001mb> {
		return this.toolService.update(toolDTO);
	}

    @UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Tool001mb[]> {
		return this.toolService.findAll();
	}
	
    @UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Tool001mb> {
		return this.toolService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.toolService.remove(id);
	}
}