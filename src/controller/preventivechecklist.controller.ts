import { Body, Controller, Delete, Header,Get, Param, Post, Put, Res,Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PreventiveChecklistDTO } from "src/dto/preventivechecklist.dto";
import { Preventivechecklist001wb } from "src/entity/Preventivechecklist001wb";
import { PreventiveCheckListService } from "src/service/preventivechecklist.service";
import { Response } from "express";
import { Request } from "supertest";
var path = require('path');
const fs = require('fs')

@Controller('/testandreportstudio/api/preventivechecklist')
export class PreventiveCheckListController {
	constructor(private readonly preventiveCheckListService: PreventiveCheckListService) { }

	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() preventiveChecklistDTO: PreventiveChecklistDTO[]): Promise<Preventivechecklist001wb[]> {
		return this.preventiveCheckListService.create(preventiveChecklistDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() preventiveChecklistDTO: PreventiveChecklistDTO): Promise<Preventivechecklist001wb> {
		return this.preventiveCheckListService.update(preventiveChecklistDTO);
	}

    @UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Preventivechecklist001wb[]> {
		return this.preventiveCheckListService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllByMachineId/:mslno')
	findAllByMachineId(@Param('mslno') mslno: number): Promise<Preventivechecklist001wb[]> {
		return this.preventiveCheckListService.findAllByMachineId(mslno);
	}
	
    @UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Preventivechecklist001wb> {
		return this.preventiveCheckListService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.preventiveCheckListService.remove(id);
	}

	@Get('pdf/:mslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.preventiveCheckListService.downloadPdf(mslno, request, response);
	}

	@Get('excel/:mslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.preventiveCheckListService.downloadExcel(mslno, request, response);
    }
}