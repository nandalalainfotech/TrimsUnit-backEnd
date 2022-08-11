import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierreportDTO } from "src/dto/Supplierreport.dto";
import { Supplierreport001wb } from "src/entity/Supplierreport001wb";
import { SupplierreportService } from "src/service/supplierreportwb.service";
import { Request } from "supertest";
import { Response } from "express";


var path = require('path');
const fs = require('fs');




@Controller('/testandreportstudio/api/supreport')
export class SupplierreportController {
	constructor(private readonly supplierreportService: SupplierreportService) { }

	@Get('pdf/:supregslNo')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('supregslNo') supregslNo : any, @Req() request: Request, @Res() response: Response) {
		return await this.supplierreportService.downloadPdf(supregslNo, request, response);
	}

	@UseGuards(JwtAuthGuard)
	@Get('excel/:supregslNo')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('supregslNo') supregslNo: any, @Req() request: Request, @Res() response: Response) {

		return await this.supplierreportService.downloadExcel(supregslNo, request, response);
	}




	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() supplierreportDTO: SupplierreportDTO): Promise<Supplierreport001wb> {
		return this.supplierreportService.create(supplierreportDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() supplierreportDTO: SupplierreportDTO): Promise<Supplierreport001wb> {
		return this.supplierreportService.update(supplierreportDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Supplierreport001wb[]> {
		return this.supplierreportService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllBySupplierId/:supregslno')
	findAllBySupplierId(@Param('supregslno') supregslno: number): Promise<Supplierreport001wb[]> {
		return this.supplierreportService.findAllBySupplierId(supregslno);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.supplierreportService.remove(slNo);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Supplierreport001wb> {
		return this.supplierreportService.findOne(id);
	}
}