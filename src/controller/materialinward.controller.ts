import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MaterialinwardService } from "src/service/materialinward.service";
import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { MaterialinwardDTO } from "src/dto/Materialinward.dto";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/materialinward')

export class MaterialinwardController {
    constructor(private readonly materialinwardService: MaterialinwardService) { }

    @Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {		
		return await this.materialinwardService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.materialinwardService.downloadExcel(request, response);
    }

    @UseGuards(JwtAuthGuard)
	@Get('getCount')
	getCount(): Promise<string> {
		return this.materialinwardService.getCount();
	}


    @Post("save")
    create(@Body() materialinwardDTO: MaterialinwardDTO): Promise<Materialinward001wb> {
        return this.materialinwardService.create(materialinwardDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() materialinwardDTO: MaterialinwardDTO): Promise<Materialinward001wb> {
        return this.materialinwardService.update(materialinwardDTO);
    }

    @Get('findAll')
    findAll(): Promise<Materialinward001wb[]> {
        return this.materialinwardService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Materialinward001wb> {
        return this.materialinwardService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.materialinwardService.remove(id);
    }

}