import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { OrderItemMbDTO } from "src/dto/orderitems.dto";

import { OrderItemMbService } from "src/service/orderitems.service";
import { Response } from "express";
import { Request } from "supertest";
import { SalesItemMbService } from "src/service/salesitem.service";
import { Salesitem001mb } from "src/entity/Salesitem001mb";
import { SalesItemMbDTO } from "src/dto/SalesItem.dto";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/sale')
export class SalesItemMbController {
	constructor(private readonly salesItemMbService: SalesItemMbService) { }

	// @Get('pdf')
	// @Header('Content-Type', 'application/pdf')
	// async downloadPdf(@Req() request: Request, @Res() response: Response) {
	// 			return await this.salesItemMbService.downloadPdf(request, response);
	// }


	// @Get('excel')
	// @Header("Content-Type",
	// 	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	// @Header("Content-Disposition",
	// 	"attachment; filename=" + "Attendace Report" + ".xlsx")
    // async downloadExcel(@Req() request: Request, @Res() response: Response) {		
    //     return await this.salesItemMbService.downloadExcel(request, response);
    // }

	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() salesItemMbDTO: SalesItemMbDTO): Promise<Salesitem001mb> {
		return this.salesItemMbService.create(salesItemMbDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() salesItemMbDTO: SalesItemMbDTO): Promise<Salesitem001mb> {
		return this.salesItemMbService.update(salesItemMbDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Salesitem001mb[]> {
		return this.salesItemMbService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('getCount')
	getCount(): Promise<string> {
		return this.salesItemMbService.getCount();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.salesItemMbService.remove(id);
	}
	@UseGuards(JwtAuthGuard)
	@Get(':custemerSlno')
	findOne(@Param('custemerSlno') custemerSlno: number): Promise<Salesitem001mb> {
		return this.salesItemMbService.findOne(custemerSlno);
	}
    
	
}


