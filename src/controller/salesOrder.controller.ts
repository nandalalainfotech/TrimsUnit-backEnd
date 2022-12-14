import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SalesOrderDTO } from 'src/dto/salesOrder.dto';
import { SalesOrderService } from 'src/service/salesOrder.service';
import { Response } from "express";
import { Request } from "supertest";
import { Salesorder001wb } from 'src/entity/Salesorder001wb';

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/sales')

export class SalesOrderController {
	constructor(private readonly salesOrderService: SalesOrderService ) { }

	@Get('pdf')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf( @Req() request: Request, @Res() response: Response) {
    	return await this.salesOrderService.downloadPdf(request, response);
    }

    // @UseGuards(JwtAuthGuard)
	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel( @Req() request: Request, @Res() response: Response) {
		return await this.salesOrderService.downloadExcel(request, response);
	}

	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body()salesOrderDTO: SalesOrderDTO): Promise<Salesorder001wb> {
		return this.salesOrderService.create(salesOrderDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body()salesOrderDTO: SalesOrderDTO): Promise<Salesorder001wb> {
		return this.salesOrderService.update(salesOrderDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Salesorder001wb[]> {
		return this.salesOrderService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Salesorder001wb> {
		return this.salesOrderService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.salesOrderService.remove(id);
	}
}

