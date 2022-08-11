import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Response } from "express";
import { Request } from "supertest";
import { SalesInvoiceService } from "src/service/SalesInvoice.service";
import { Salesinvoice001wb } from "src/entity/Salesinvoice001wb";
import { SalesInvoiceDTO } from "src/dto/salesInvoice.dto";
var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/salesinvocie')
export class SalesInvoiceController {
    constructor(private readonly salesInvoiceService: SalesInvoiceService) { }

    @Get('pdf')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Req() request: Request, @Res() response: Response) {
        return await this.salesInvoiceService.downloadPdf(request, response);
    }

   


    @Get('pdf/:id')
    @Header('Content-Type', 'application/pdf')
    async downloadParamsPdf(@Param('id') id: number, @Res() response: Response) {
        return await this.salesInvoiceService.downloadParamsPdf(id, response);
    }

    @Get('excel/:id')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel1(@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.salesInvoiceService.downloadExcel1(id, response);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('excel')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.salesInvoiceService.downloadExcel(request, response);
    }

    @Post("save")
    create(@Body() salesInvoiceDTO: SalesInvoiceDTO): Promise<Salesinvoice001wb> {
        // console.log("PurchaseorderDTO",purchaseorderDTO.orderitemSlno2.purchaseorder001wbs);
        return this.salesInvoiceService.create(salesInvoiceDTO);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.salesInvoiceService.getCount();
    }
    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() salesInvoiceDTO: SalesInvoiceDTO): Promise<Salesinvoice001wb> {
        // console.log("PurchaseorderDTO",purchaseorderDTO.orderslno);
        return this.salesInvoiceService.update(salesInvoiceDTO);
    }

    @Get('findAll')
    findAll(): Promise<Salesinvoice001wb[]> {
        return this.salesInvoiceService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Salesinvoice001wb> {
        return this.salesInvoiceService.findOne(id);
    }

   

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.salesInvoiceService.remove(id);
    }

}