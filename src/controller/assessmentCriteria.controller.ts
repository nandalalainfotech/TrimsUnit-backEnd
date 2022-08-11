import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AssessmentCriteriaDTO } from "src/dto/assessmentCriteria.dto";
import { Assessmentcriteria001mb } from "src/entity/Assessmentcriteria001mb";
import { AssessmentCriteriaService } from "src/service/assessmentCriteria.service";

import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/criteria')
export class AssessmentCriteriaController {
    constructor(private readonly assessmentCriteriaService: AssessmentCriteriaService) { }


    
	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		
		return await this.assessmentCriteriaService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
		
        return await this.assessmentCriteriaService.downloadExcel(request, response);
    }

    @Post("save")
    create(@Body() assessmentCriteriaDTO: AssessmentCriteriaDTO): Promise<Assessmentcriteria001mb> {
        return this.assessmentCriteriaService.create(assessmentCriteriaDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() assessmentCriteriaDTO: AssessmentCriteriaDTO): Promise<Assessmentcriteria001mb> {
        return this.assessmentCriteriaService.update(assessmentCriteriaDTO);
    }

    @Get('findAll')
    findAll(): Promise<Assessmentcriteria001mb[]> {
        return this.assessmentCriteriaService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Assessmentcriteria001mb> {
        return this.assessmentCriteriaService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.assessmentCriteriaService.remove(id);
    }
}