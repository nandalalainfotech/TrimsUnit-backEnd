import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierattendancereportDTO } from "src/dto/Supplierattendancereport.dto";
import { Supplierattendancereport001wb } from "src/entity/Supplierattendancereport001wb";
import { SupplierattendanceService } from "src/service/Supplierattendancereport.service";
import { Request } from "supertest";
import { Response } from "express";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/attendanceReport')
export class SupplierattendanceController {
    constructor(private readonly supplierattendanceService: SupplierattendanceService) { }

    @Post("save")
    create(@Body() supplierattendancereportDTO: SupplierattendancereportDTO): Promise<Supplierattendancereport001wb> {
        return this.supplierattendanceService.create(supplierattendancereportDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() supplierattendancereportDTO: SupplierattendancereportDTO): Promise<Supplierattendancereport001wb> {
        return this.supplierattendanceService.update(supplierattendancereportDTO);
    }

    @Get('findAll')
    findAll(): Promise<Supplierattendancereport001wb[]> {
        return this.supplierattendanceService.findAll();
    }

    @UseGuards(JwtAuthGuard)
	@Get('findAllBySupplierId/:supregslNo')
	findAllBySupplierId(@Param('supregslNo') supregslNo: number): Promise<Supplierattendancereport001wb[]> {
		return this.supplierattendanceService.findAllBySupplierId(supregslNo);
	}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Supplierattendancereport001wb> {
        return this.supplierattendanceService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.supplierattendanceService.remove(id);
    }

    @Get('pdf/:supregslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.supplierattendanceService.downloadPdf(supregslno, request, response);
	}

	@UseGuards(JwtAuthGuard)
	@Get('excel/:supregslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {

		return await this.supplierattendanceService.downloadExcel(supregslno, request, response);
	}
}