import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ProdDTO } from "src/dto/Prod.dto";
import { Prod001mb } from "src/entity/Prod001mb";
import { ProdService } from "src/service/prod.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/prod')
export class ProdController {
	constructor(private readonly prodService: ProdService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
				return await this.prodService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {		
        return await this.prodService.downloadExcel(request, response);
    }

	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() prodDTO: ProdDTO): Promise<Prod001mb> {
		return this.prodService.create(prodDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() prodDTO: ProdDTO): Promise<Prod001mb> {
		return this.prodService.update(prodDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Prod001mb[]> {
		return this.prodService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.prodService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Prod001mb> {
		return this.prodService.findOne(id);
	}


	

	

	


	
	



}