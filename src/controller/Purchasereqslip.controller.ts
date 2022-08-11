import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PurchasereqslipDTO } from "src/dto/Purchasereqslip.dto";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { PurchasereqslipService } from "src/service/Purchasereqslip.service";
import { Response } from "express";
import { Request } from "supertest";
import { resolve } from "path";
var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/purchasereq')
export class PurchasereqslipController {
	constructor(private readonly purchasereqslipService: PurchasereqslipService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.purchasereqslipService.downloadPdf(request, response);
	}

	@Get('pdf/:id')
	@Header('Content-Type', 'application/pdf')
	async downloadIDPdf(@Param('id') id: number, @Res() response: Response) {
		return await this.purchasereqslipService.downloadIDPdf(id, response);
	}

	// @UseGuards(JwtAuthGuard)
	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Req() request: Request, @Res() response: Response) {
		return await this.purchasereqslipService.downloadExcel(request, response);
	}
	@Get('excel/:id')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadIDExcel(@Param('id') id: number, @Res() response: Response) {
		return await this.purchasereqslipService.downloadIDExcel(id, response);
	}
	@UseGuards(JwtAuthGuard)
	@Get('getCount')
	getCount(): Promise<string> {
		return this.purchasereqslipService.getCount();
	}



	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() purchasereqslipDTO: PurchasereqslipDTO): Promise<Purchasereqslip001wb> {
		console.log("purchasereqslipDTO",purchasereqslipDTO);
		return this.purchasereqslipService.create(purchasereqslipDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() purchasereqslipDTO: PurchasereqslipDTO): Promise<Purchasereqslip001wb> {
		return this.purchasereqslipService.update(purchasereqslipDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Purchasereqslip001wb[]> {
		return this.purchasereqslipService.findAll();
	}

	@UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Purchasereqslip001wb> {
        return this.purchasereqslipService.findOne(id);
    }


	@UseGuards(JwtAuthGuard)
	@Get('updatereqslip/:approvel/:pchaseslno/:remarks')
	updatereqslip(@Param('approvel') approvel: any, @Param('pchaseslno') pchaseslno: any,@Param('remarks') remarks: any): Promise<Purchasereqslip001wb> {
		console.log("approvel",approvel);
		return this.purchasereqslipService.updatereqslip(approvel, pchaseslno,remarks);	
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.purchasereqslipService.remove(id);
	}

}