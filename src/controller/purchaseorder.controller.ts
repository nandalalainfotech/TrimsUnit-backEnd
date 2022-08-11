import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PurchaseorderDTO } from "src/dto/Purchaseorder.dto";
import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { PurchaseOrderService } from "src/service/purchaseorder.service";
import { Response } from "express";
import { Request } from "supertest";
var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/order')
export class PurchaseOrderController {
    constructor(private readonly purchaseOrderService: PurchaseOrderService) { }

    @Get('pdf')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Req() request: Request, @Res() response: Response) {
        return await this.purchaseOrderService.downloadPdf(request, response);
    }

    // @Get('pdf1')
    // @Header('Content-Type', 'application/pdf')
    // async downloadPdf1(@Req() request: Request, @Res() response: Response) {
    //     return await this.purchaseOrderService.downloadPdf1(request, response);
    // }


    @Get('pdf/:id')
    @Header('Content-Type', 'application/pdf')
    async downloadParamsPdf(@Param('id') id: number, @Res() response: Response) {
        return await this.purchaseOrderService.downloadParamsPdf(id, response);
    }

    @Get('excel/:id')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel1(@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.purchaseOrderService.downloadExcel1(id, response);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('excel')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.purchaseOrderService.downloadExcel(request, response);
    }

    @Post("save")
    create(@Body() purchaseorderDTO: PurchaseorderDTO): Promise<Purchaseorder001wb> {
        // console.log("PurchaseorderDTO",purchaseorderDTO.orderitemSlno2.purchaseorder001wbs);
        return this.purchaseOrderService.create(purchaseorderDTO);
    }

    @UseGuards(JwtAuthGuard)
	@Get('UpdatePO/:approvel/:pchaseslno/:remarks')
	UpdatePO(@Param('approvel') approvel: any, @Param('pchaseslno') pchaseslno: any,@Param('remarks') remarks: any): Promise<Purchaseorder001wb> {
		console.log("approvel",approvel);
		return this.purchaseOrderService.UpdatePO(approvel, pchaseslno,remarks);	
	}

    
    @UseGuards(JwtAuthGuard)
	@Get('findAllByMetrialId/:purchseSlno')
	findAllByMetrialId(@Param('purchseSlno') purchseSlno: number): Promise<Purchaseorder001wb> {
		return this.purchaseOrderService.findOne(purchseSlno);
	}

    
    @UseGuards(JwtAuthGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.purchaseOrderService.getCount();
    }
    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() purchaseorderDTO: PurchaseorderDTO): Promise<Purchaseorder001wb> {
        // console.log("PurchaseorderDTO",purchaseorderDTO.orderslno);
        return this.purchaseOrderService.update(purchaseorderDTO);
    }

    @Get('findAll')
    findAll(): Promise<Purchaseorder001wb[]> {
        return this.purchaseOrderService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Purchaseorder001wb> {
        return this.purchaseOrderService.findOne(id);
    }
    @UseGuards(JwtAuthGuard)
    @Get(':purchseId')
    findById(@Param('purchseId') purchseId: any): Promise<Purchaseorder001wb> {
        return this.purchaseOrderService.findById(purchseId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.purchaseOrderService.remove(id);
    }

}