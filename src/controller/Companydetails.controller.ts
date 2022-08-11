import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CompanydetailsDTO } from "src/dto/Companydetails.dto";
import { Companydetails001mb } from "src/entity/Companydetails001mb";
import { CompanyService } from "src/service/Companydetails.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/companyDetails')

export class CompanyController {
	constructor(private readonly CompanyService: CompanyService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {		
		return await this.CompanyService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.CompanyService.downloadExcel(request, response);
    }

	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() companydetailsDTO: CompanydetailsDTO): Promise<Companydetails001mb> {
        return this.CompanyService.create(companydetailsDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() companydetailsDTO: CompanydetailsDTO): Promise<Companydetails001mb> {
		return this.CompanyService.update(companydetailsDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Companydetails001mb[]> {
		return this.CompanyService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllBycompany/:companySlno')
	findAllBycompany(@Param('companySlno') companySlno: number): Promise<Companydetails001mb[]> {
		return this.CompanyService.findAllBycompany(companySlno);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.CompanyService.remove(slNo);
	}

}