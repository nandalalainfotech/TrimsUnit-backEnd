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
import { FirePlanService } from "src/service/fireplan.service";
import { Fireplan001wb } from "src/entity/Fireplan001wb";
import { FireplanDTO } from "src/dto/fireplan.dto";
var path = require('path');



@Controller('/testandreportstudio/api/fireplan')
export class FirePlanControllers {
	constructor(private readonly fireplanService: FirePlanService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.fireplanService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
		return await this.fireplanService.downloadExcel(request, response);
    }


	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() fireplanDTO: FireplanDTO): Promise<Fireplan001wb> {
		
		return this.fireplanService.create(fireplanDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() fireplanDTO: FireplanDTO): Promise<Fireplan001wb> {
		return this.fireplanService.update(fireplanDTO);
	}
	@Get('findNotificationAll')
	findeNotificationAll(): Promise<Fireplan001wb[]> {
		return this.fireplanService.findNotificationAll();
	}
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Fireplan001wb[]> {
		return this.fireplanService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.fireplanService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Fireplan001wb> {
		return this.fireplanService.findOne(id);
	}
}