import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SuppliertrainingplanDTO } from "src/dto/Suppliertraningplan.dto";
import { Suppliertrainingplan001wb } from "src/entity/Suppliertrainingplan001wb";
import { SuppliertrainingService } from "src/service/suppliertraningplan.service";
import { Request } from "supertest";
import { Response } from "express";
var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/suptraining')
export class SuppliertrainingController {
    constructor(private readonly suppliertrainingService: SuppliertrainingService) { }

    @Get('NotificationAll')
	NotificationAll(): Promise<Suppliertrainingplan001wb[]> {
		return this.suppliertrainingService.NotificationAll();
	}

    @Post("save")
    create(@Body() suppliertrainingplanDTO: SuppliertrainingplanDTO): Promise<Suppliertrainingplan001wb> {
        return this.suppliertrainingService.create(suppliertrainingplanDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() suppliertrainingplanDTO: SuppliertrainingplanDTO): Promise<Suppliertrainingplan001wb> {
        return this.suppliertrainingService.update(suppliertrainingplanDTO);
    }

    @Get('findAll')
    findAll(): Promise<Suppliertrainingplan001wb[]> {
        return this.suppliertrainingService.findAll();
    }

    @UseGuards(JwtAuthGuard)
	@Get('findAllBySupplierId/:supregslno')
	findAllBySupplierId(@Param('supregslno') supregslno: number): Promise<Suppliertrainingplan001wb[]> {
		return this.suppliertrainingService.findAllBySupplierId(supregslno);
	}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Suppliertrainingplan001wb> {
        return this.suppliertrainingService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.suppliertrainingService.remove(id);
    }

    @Get('pdf/:supregslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.suppliertrainingService.downloadPdf(supregslno, request, response);
	}

	// @UseGuards(JwtAuthGuard)
	@Get('excel/:supregslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.suppliertrainingService.downloadExcel(supregslno, request, response);
	}
}