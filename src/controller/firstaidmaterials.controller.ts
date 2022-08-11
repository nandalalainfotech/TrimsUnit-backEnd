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
var path = require('path');



@Controller('/testandreportstudio/api/firstaidmaterials')
export class FirstaidMaterialsControllers {
	constructor(private readonly firstaidmaterialsService: FirstaidMaterialsService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.firstaidmaterialsService.downloadPdf(request, response);
	}

	// @UseGuards(JwtAuthGuard)
	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Req() request: Request, @Res() response: Response) {

		return await this.firstaidmaterialsService.downloadExcel(request, response);
	}




	


	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() firstaidMaterialsDTO: FirstaidMaterialsDTO): Promise<Firstaidwb001> {		
		return this.firstaidmaterialsService.create(firstaidMaterialsDTO);
	}

	

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() firstaidMaterialsDTO: FirstaidMaterialsDTO): Promise<Firstaidwb001> {
		return this.firstaidmaterialsService.update(firstaidMaterialsDTO);
	}
	// @UseGuards(JwtAuthGuard)
	// @Put("update")
	// @UseInterceptors(FileInterceptor('file'))
	// uploadFile1(@UploadedFile() file: Express.Multer.File, @Body() employeedetailsDTO: EmployeeDetailsDTO) {
	// 	return this.employeedetailsService.update(file, employeedetailsDTO);
	// }

	// @UseGuards(JwtAuthGuard)
	// findAll(): Promise<Firstaidwb001[]> {
	// 	return this.firstaidmaterialsService.findAll();
	// }
	@Get('findeNotificationAll')
	findeNotificationAll(): Promise<Firstaidwb001[]> {
		return this.firstaidmaterialsService.findeNotificationAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Firstaidwb001[]> {
		return this.firstaidmaterialsService.findAll();
	}

	// @UseGuards(JwtAuthGuard)
	// @Get('findAllByEmployeId/:eslno')
	// findAllByEmployeId(@Param('eslno') eslno: number): Promise<Firstaidwb001[]> {
	// 	return this.firstaidmaterialsService.findAllByEmployeId(eslno);
	// }


	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.firstaidmaterialsService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Firstaidwb001> {
		return this.firstaidmaterialsService.findOne(id);
	}










}