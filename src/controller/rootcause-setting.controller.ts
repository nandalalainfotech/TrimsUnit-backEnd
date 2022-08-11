import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RootcauseDTO } from "src/dto/rootcause.dto";
import { Rootcause001mb } from "src/entity/Rootcause001mb";
import { RootcauseService } from "src/service/rootcause-setting.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/rootcause')
export class RootcauseController {
	constructor(private readonly rootcauseService: RootcauseService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.rootcauseService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.rootcauseService.downloadExcel(request, response);
    }




	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() rootcauseDTO: RootcauseDTO): Promise<Rootcause001mb> {
		return this.rootcauseService.create(rootcauseDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() rootcauseDTO: RootcauseDTO): Promise<Rootcause001mb> {
		return this.rootcauseService.update(rootcauseDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Rootcause001mb[]> {
		return this.rootcauseService.findAll();
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAllbyBreakDownId/:bdslno')
	findAllbyBreakDownId(@Param('bdslno') bdslno: number): Promise<Rootcause001mb[]> {
		return this.rootcauseService.findAllbyBreakDownId(bdslno);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.rootcauseService.remove(slNo);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Rootcause001mb> {
		return this.rootcauseService.findOne(id);
	}
}