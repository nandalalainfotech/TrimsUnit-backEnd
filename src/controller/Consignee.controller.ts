import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ConsigneeDTO } from "src/dto/Consignee.dto";
import { Consignee001mb } from "src/entity/Consignee001mb";
import { ConsigneeService } from "src/service/Consignee.service";

import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/consignee')

export class ConsigneeController {
	constructor(private readonly consigneeService: ConsigneeService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {		
		return await this.consigneeService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.consigneeService.downloadExcel(request, response);
    }


	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() consigneeDTO: ConsigneeDTO): Promise<Consignee001mb> {
        return this.consigneeService.create(consigneeDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() consigneeDTO: ConsigneeDTO): Promise<Consignee001mb> {
		return this.consigneeService.update(consigneeDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Consignee001mb[]> {
		return this.consigneeService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllbyPurchaseOrderId/:poslNo')
	findAllbyPurchaseOrderId(@Param('poslNo') poslNo: number): Promise<Consignee001mb[]> {
		return this.consigneeService.findAllbyPurchaseOrderId(poslNo);
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllByconsignee/:consigneeSlno')
	findAllByconsignee(@Param('consigneeSlno') consigneeSlno: number): Promise<Consignee001mb[]> {
		return this.consigneeService.findAllByconsignee(consigneeSlno);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.consigneeService.remove(slNo);
	}

}