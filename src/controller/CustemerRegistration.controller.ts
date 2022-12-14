import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Response } from "express";
import { Request } from "supertest";
import { CustemerRegistrationService } from "src/service/CustemerRegistration.service";
import { CustemerRegistrationDTO } from "src/dto/custemerRegistration.dto";
import { Custemerregistration001mb } from "src/entity/Custemerregistration001mb";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/custemerReg')
export class CustemerRegistrationController {
    constructor(private readonly CustemerRegiService: CustemerRegistrationService) { }

    // @Get('pdf')
	// @Header('Content-Type', 'application/pdf')
	// async downloadPdf(@Req() request: Request, @Res() response: Response) {
	// 	return await this.supplierRegService.downloadPdf(request, response);
	// }


	// @Get('excel')
	// @Header("Content-Type",
	// 	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	// @Header("Content-Disposition",
	// 	"attachment; filename=" + "Attendace Report" + ".xlsx")
    // async downloadExcel(@Req() request: Request, @Res() response: Response) {
    //     return await this.supplierRegService.downloadExcel(request, response);
    // }



    @Post("save")
    create(@Body() custemerRegDTO: CustemerRegistrationDTO): Promise<Custemerregistration001mb> {
        return this.CustemerRegiService.create(custemerRegDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() custemerRegDTO: CustemerRegistrationDTO): Promise<Custemerregistration001mb> {
        return this.CustemerRegiService.update(custemerRegDTO);
    }

    @Get('findAll')
    findAll(): Promise<Custemerregistration001mb[]> {
        return this.CustemerRegiService.findAll();
    }

    @Get('findAllSlNoAndSuppcode')
    findAllSlNoAndSuppcode(): Promise<Custemerregistration001mb[]> {
        return this.CustemerRegiService.findAllSlNoAndSuppcode();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Custemerregistration001mb> {
        return this.CustemerRegiService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.CustemerRegiService.remove(id);
    }
}