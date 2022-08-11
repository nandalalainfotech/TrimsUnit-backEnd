import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CustomerDTO } from "src/dto/Customer.dto";
import { Customer001mb } from "src/entity/Customer001mb";
import { CustomerService } from "src/service/customer.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
				return await this.customerService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {		
        return await this.customerService.downloadExcel(request, response);
    }

    @UseGuards(JwtAuthGuard)
    @Post("save")
    create(@Body() customerDTO: CustomerDTO): Promise<Customer001mb> {
        return this.customerService.create(customerDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() customerDTO: CustomerDTO): Promise<Customer001mb> {
        return this.customerService.update(customerDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get('findAll')
    findAll(): Promise<Customer001mb[]> {
        return this.customerService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: number): Promise<void> {
        return this.customerService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Customer001mb> {
        return this.customerService.findOne(id);
    }
 
    














}