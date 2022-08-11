import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PaymentDTO } from "src/dto/Payment.dto";
import { Payment001wb } from "src/entity/Payment001wb";
import { PaymentService } from "src/service/Payment.service";
import { Response } from "express";
import { Request } from "supertest";
var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/payment')

export class PaymentController {

	constructor(private readonly paymentService: PaymentService) { }

	@Get('pdf')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf( @Req() request: Request, @Res() response: Response) {
    	return await this.paymentService.downloadPdf(request, response);
    }

    // @UseGuards(JwtAuthGuard)
	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel( @Req() request: Request, @Res() response: Response) {
		return await this.paymentService.downloadExcel(request, response);
	}

    
	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() paymentDTO: PaymentDTO): Promise<Payment001wb> {
		return this.paymentService.create(paymentDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() paymentDTO: PaymentDTO): Promise<Payment001wb> {
		return this.paymentService.update(paymentDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Payment001wb[]> {
		return this.paymentService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.paymentService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Payment001wb> {
		return this.paymentService.findOne(id);
	}
}