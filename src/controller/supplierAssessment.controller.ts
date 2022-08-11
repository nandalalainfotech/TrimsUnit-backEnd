import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierAssessmentDTO } from "src/dto/supplierAssessment.dto";
import { Supplierassessment001wb } from "src/entity/Supplierassessment001wb";
import { SupplierAssessmentService } from "src/service/supplierAssessment.service";
import { Request } from "supertest";
import { Response } from "express";


var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/assessment')
export class SupplierAssessmentController {
    constructor(private readonly supplierAssessmentService: SupplierAssessmentService) { }

    @Get('pdf/:suppSlno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('suppSlno') suppSlno: any, @Req() request: Request, @Res() response: Response) {
		return await this.supplierAssessmentService.downloadPdf(suppSlno, request, response);
	}

	@UseGuards(JwtAuthGuard)
	@Get('excel/:suppSlno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('suppSlno') suppSlno: any, @Req() request: Request, @Res() response: Response) {

		return await this.supplierAssessmentService.downloadExcel(suppSlno, request, response);
	}


    @Post("save")
    create(@Body() supplierAssessmentDTO: SupplierAssessmentDTO): Promise<Supplierassessment001wb> {
        return this.supplierAssessmentService.create(supplierAssessmentDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() supplierAssessmentDTO: SupplierAssessmentDTO): Promise<Supplierassessment001wb> {
        return this.supplierAssessmentService.update(supplierAssessmentDTO);
    }

    @Get('findAll')
    findAll(): Promise<Supplierassessment001wb[]> {
        return this.supplierAssessmentService.findAll();
    }

    @UseGuards(JwtAuthGuard)
	@Get('findAllBySupplierId/:suppSlno')
	findAllBySupplierId(@Param('suppSlno') suppSlno: number): Promise<Supplierassessment001wb[]> {
		return this.supplierAssessmentService.findAllBySupplierId(suppSlno);
	}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Supplierassessment001wb> {
        return this.supplierAssessmentService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.supplierAssessmentService.remove(id);
    }
}