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
import { Legal001wb } from "src/entity/Legal001wb";
import { LegalService } from "src/service/legal.service";
import { LegalwbDTO } from "src/dto/legal.dto";
var path = require('path');


const fs = require('fs');


@Controller('/testandreportstudio/api/legal')
export class LegalControllers {
   // safetyEquipmentsService: any;
	constructor(private readonly legalService: LegalService) { }


	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.legalService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response,) {
		
        return await this.legalService.downloadExcel(request, response);
    }

	@UseGuards(JwtAuthGuard)
	@Post('save')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File, @Body() legalwbDTO: LegalwbDTO) {
		return this.legalService.create(file, legalwbDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	@UseInterceptors(FileInterceptor('file'))
	uploadFile1(@UploadedFile() file: Express.Multer.File, @Body() legalwbDTO: LegalwbDTO) {
		return this.legalService.update(file, legalwbDTO);
	}
	

	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Legal001wb[]> {
		return this.legalService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.legalService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Legal001wb> {
		return this.legalService.findOne(id);
	}


	@Get('download/:originalfilename')
	download(@Param() originalfilename: any, @Req() request: Request, @Res() response: Response) {
		var filePath = path.join(`./uploads/`) + originalfilename.originalfilename;
		const filestream = createReadStream(filePath);
		filestream.pipe(response);
	}
}