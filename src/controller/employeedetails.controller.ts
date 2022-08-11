import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import { EmployeeDetailsDTO } from "src/dto/employeedetails.dto";

import { Emp001mb } from "src/entity/Emp001mb";
import { ActivityService } from "src/service/activity.service";
import { EmployeeDetailsService } from "src/service/Employeedetails.service";

import { Response } from "express";
import { createReadStream } from "fs";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/empdetails')
export class EmployeeDetailsController {
	constructor(private readonly employeedetailsService: EmployeeDetailsService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		
		return await this.employeedetailsService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
		
        return await this.employeedetailsService.downloadExcel(request, response);
    }


	
	// @UseGuards(JwtAuthGuard)
	// @Post("save")
	// create(@Body() employeedetailsDTO: EmployeeDetailsDTO): Promise<Emp001mb> {
	// 	return this.employeedetailsService.create(employeedetailsDTO);
	// }

	@UseGuards(JwtAuthGuard)
	@Post('save')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File, @Body() employeedetailsDTO: EmployeeDetailsDTO) {
		
		return this.employeedetailsService.create(file, employeedetailsDTO);
	}

	// @UseGuards(JwtAuthGuard)
	// @Put("update")
	// update(@Body() employeedetailsDTO: EmployeeDetailsDTO): Promise<Emp001mb> {
	// 	return this.employeedetailsService.update(employeedetailsDTO);
	// }
	@UseGuards(JwtAuthGuard)
	@Put("update")
	@UseInterceptors(FileInterceptor('file'))
	uploadFile1(@UploadedFile() file: Express.Multer.File, @Body() employeedetailsDTO: EmployeeDetailsDTO) {
		return this.employeedetailsService.update(file, employeedetailsDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Emp001mb[]> {
		return this.employeedetailsService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.employeedetailsService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Emp001mb> {
		return this.employeedetailsService.findOne(id);
	}
	@Get('download/:originalfilename')
	download(@Param() originalfilename: any, @Req() request: Request, @Res() response: Response) {
		
		
		var filePath = path.join(`./uploads/`) + originalfilename.originalfilename;
		const filestream = createReadStream(filePath);
		
		
		filestream.pipe(response);
	}
}