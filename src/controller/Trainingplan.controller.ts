import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TrainingplanDTO } from "src/dto/Trainingplan.dto";
import { Trainingplan001mb } from "src/entity/Trainingplan001mb";
import { TrainingplanService } from "src/service/Trainingplan.service";
import { Response } from "express";
import { Request } from "supertest";


var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/trainingplan')
export class TrainingplanController {
    constructor(private readonly trainingplanService: TrainingplanService) { }

    @Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {		
		return await this.trainingplanService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.trainingplanService.downloadExcel(request, response);
    }



    @Get('findAll')
    findAll(): Promise<Trainingplan001mb[]> {
        return this.trainingplanService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("save")
    create(@Body() trainingplanDTO: TrainingplanDTO): Promise<Trainingplan001mb> {
        return this.trainingplanService.create(trainingplanDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() trainingplanDTO: TrainingplanDTO): Promise<Trainingplan001mb> {
        return this.trainingplanService.update(trainingplanDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Trainingplan001mb> {
        return this.trainingplanService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.trainingplanService.remove(id);
    }
}