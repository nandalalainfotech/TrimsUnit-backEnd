import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MaterialRequisitionSlipDTO } from "src/dto/material-req-slip.dto";
import { Materialreqslip001wb } from "src/entity/Materialreqslip001wb";
import { MaterialRequisitionSlipService } from "src/service/material-req-slip.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/materialreq')

export class MaterialRequistionController {
    constructor(private readonly materialReqService: MaterialRequisitionSlipService) { }

    @Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {		
		return await this.materialReqService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.materialReqService.downloadExcel(request, response);
    }


    

    @Post("save")
    create(@Body() materialReqDTO: MaterialRequisitionSlipDTO): Promise<Materialreqslip001wb> {
        return this.materialReqService.create(materialReqDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() materialReqDTO: MaterialRequisitionSlipDTO): Promise<Materialreqslip001wb> {
        return this.materialReqService.update(materialReqDTO);
    }

    @Get('findAll')
    findAll(): Promise<Materialreqslip001wb[]> {
        return this.materialReqService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Materialreqslip001wb> {
        return this.materialReqService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.materialReqService.remove(id);
    }

}