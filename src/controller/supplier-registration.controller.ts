import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierRegistrationDTO } from "src/dto/supplier-registration.dto";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { SupplierRegistrationService } from "src/service/supplier-registration.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/supplierReg')
export class SupplierRegistrationController {
    constructor(private readonly supplierRegService: SupplierRegistrationService) { }

    @Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.supplierRegService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.supplierRegService.downloadExcel(request, response);
    }



    @Post("save")
    create(@Body() supplierRegDTO: SupplierRegistrationDTO): Promise<Supplierregistration001mb> {
        
        return this.supplierRegService.create(supplierRegDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.supplierRegService.getCount();
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() supplierRegDTO: SupplierRegistrationDTO): Promise<Supplierregistration001mb> {
        return this.supplierRegService.update(supplierRegDTO);
    }

    @Get('findAll')
    findAll(): Promise<Supplierregistration001mb[]> {
        return this.supplierRegService.findAll();
    }

    @Get('findAllSlNoAndSuppcode')
    findAllSlNoAndSuppcode(): Promise<Supplierregistration001mb[]> {
        return this.supplierRegService.findAllSlNoAndSuppcode();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Supplierregistration001mb> {
        return this.supplierRegService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.supplierRegService.remove(id);
    }
}