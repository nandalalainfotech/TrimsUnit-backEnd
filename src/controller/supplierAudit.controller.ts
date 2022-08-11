import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierauditDTO } from "src/dto/supplieraudit.dto";
import { Supplieraudit001wb } from "src/entity/Supplieraudit001wb";
import { SupplierAuditService } from "src/service/supplierAudit.service";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/supaudit')
export class SupplierAuditController {
    constructor(private readonly supplierAuditService: SupplierAuditService) { }

    @Get('findNotification')
	findNotification(): Promise<Supplieraudit001wb[]> {
		return this.supplierAuditService.findNotification();
	}

    @Post("save")
    create(@Body() supplierauditDTO: SupplierauditDTO): Promise<Supplieraudit001wb> {
        return this.supplierAuditService.create(supplierauditDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() supplierauditDTO: SupplierauditDTO): Promise<Supplieraudit001wb> {
        return this.supplierAuditService.update(supplierauditDTO);
    }

    @Get('findAll')
    findAll(): Promise<Supplieraudit001wb[]> {
        return this.supplierAuditService.findAll();
    }

    @UseGuards(JwtAuthGuard)
	@Get('findAllBySupplierId/:supregslno')
	findAllBySupplierId(@Param('supregslno') supregslno: number): Promise<Supplieraudit001wb[]> {
		return this.supplierAuditService.findAllBySupplierId(supregslno);
	}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Supplieraudit001wb> {
        return this.supplierAuditService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.supplierAuditService.remove(id);
    }

    @Get('pdf/:supregslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.supplierAuditService.downloadPdf(supregslno, request, response);
	}

	// @UseGuards(JwtAuthGuard)
	@Get('excel/:supregslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {

		return await this.supplierAuditService.downloadExcel(supregslno, request, response);
	}
}