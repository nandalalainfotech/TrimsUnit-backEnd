import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import { EmployeeDetailsDTO } from "src/dto/employeedetails.dto";

import { Emp001mb } from "src/entity/Emp001mb";
import { ActivityService } from "src/service/activity.service";
import { EmployeeDetailsService } from "src/service/Employeedetails.service";
import { Request } from "supertest";
import { Response } from "express";
import { createReadStream } from "fs";
import { FirstaidMaterialsDTO } from "src/dto/firstaid-materials.dto";
import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { FirstaidMaterialsService } from "src/service/firstaidmaterials.service";
import { SafetyEquipmentsService } from "src/service/safetyequipments.service";
import { SafetyEquipmentsDTO } from "src/dto/safetyequipments.dto";
import { Safetyequwb001 } from "src/entity/Safetyequwb001";
import { LegalDocumentsService } from "src/service/legaldocuments.service";
import { Legal001mb } from "src/entity/Legal001mb";
import { LegalDTO } from "src/dto/legaldocuments.dto";
var path = require('path');




const fs = require('fs');



@Controller('/testandreportstudio/api/legaldocuments')
export class LegalDocumentsControllers {
   // safetyEquipmentsService: any;
	constructor(private readonly legalDocumentsService: LegalDocumentsService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.legalDocumentsService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
	return await this.legalDocumentsService.downloadExcel(request, response);
    }


	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() legalDTO: LegalDTO): Promise<Legal001mb> {
		
		return this.legalDocumentsService.create(legalDTO);
	}
	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() legalDTO: LegalDTO): Promise<Legal001mb> {
		return this.legalDocumentsService.update(legalDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Legal001mb[]> {
		return this.legalDocumentsService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.legalDocumentsService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Legal001mb> {
		return this.legalDocumentsService.findOne(id);
	}
	
}