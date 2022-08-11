import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ActivityDTO } from "src/dto/Activity.dto";
import { Activity001mb } from "src/entity/Activity001mb";
import { ActivityService } from "src/service/activity.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/activity')
export class ActitvityController {
	constructor(private readonly activityService: ActivityService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {		
		return await this.activityService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.activityService.downloadExcel(request, response);
    }

	
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() activityDTO: ActivityDTO): Promise<Activity001mb> {
		return this.activityService.create(activityDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() activityDTO: ActivityDTO): Promise<Activity001mb> {
		return this.activityService.update(activityDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Activity001mb[]> {
		return this.activityService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.activityService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Activity001mb> {
		return this.activityService.findOne(id);
	}
}