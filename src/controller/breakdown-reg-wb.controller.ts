import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { BreakDownRegDTO } from "src/dto/breakdownRegwb.dto";
import { Breakdownreg001wb } from "src/entity/Breakdownreg001wb";
import { BreakDownRegService } from "src/service/breakDownRegwb.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
var path = require('path');
const fs = require('fs')


@Controller('/testandreportstudio/api/breakdownreg')
export class BreakDownRegController {
	constructor(private readonly breakDownRegService: BreakDownRegService) { }

	@UseGuards(JwtAuthGuard)
	@Post('save')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File, @Body() breakDownRegDTO: BreakDownRegDTO) {
		return this.breakDownRegService.create(file, breakDownRegDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	@UseInterceptors(FileInterceptor('file'))
	uploadFile1(@UploadedFile() file: Express.Multer.File, @Body() breakDownRegDTO: BreakDownRegDTO) {
		return this.breakDownRegService.update(file, breakDownRegDTO);
	}

	// @UseGuards(JwtAuthGuard)
	// @Get('findAll')
	// findAll(): Promise<Breakdownreg001wb[]> {
	// 	return this.breakDownRegService.findAll();
	// }
	@UseGuards(JwtAuthGuard)
	@Get('findAllByMachineId/:mslno')
	findAllByMachineId(@Param('mslno') mslno: number): Promise<Breakdownreg001wb[]> {
		return this.breakDownRegService.findAllByMachineId(mslno);
	}
	@UseGuards(JwtAuthGuard)
	@Get('findAllByDashboard')
	findAllByDashboard(): Promise<any> {
		return this.breakDownRegService.findAllByDashboard();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.breakDownRegService.remove(slNo);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Breakdownreg001wb> {
		return this.breakDownRegService.findOne(id);
	}

	@Get('pdf/:mslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.breakDownRegService.downloadPdf(mslno, request, response);
	}

	@Get('excel/:mslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.breakDownRegService.downloadExcel(mslno, request, response);
	}

	@Get('download/:originalfilename')
	download(@Param() originalfilename: any, @Req() request: Request, @Res() response: Response) {

		
		var filePath = path.join(`./uploads/`) + originalfilename.originalfilename;
		const filestream = createReadStream(filePath);
		filestream.pipe(response);
	}
}