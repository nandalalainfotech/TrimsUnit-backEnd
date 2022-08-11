import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierQuotationDTO } from "src/dto/supplierquotation.dto";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { SupplierQuotationService } from "src/service/supplierquotation.service";
import { Request } from "supertest";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
var path = require('path');
const fs = require('fs');
@Controller('/testandreportstudio/api/supquotation')
export class SupplierQuotationController {
    constructor(private readonly supplierQuotationService: SupplierQuotationService) { }
    @Get('pdf')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Req() request: Request, @Res() response: Response) {
        return await this.supplierQuotationService.downloadPdf(request, response);
    }
    @Get('pdf/:id')
    @Header('Content-Type', 'application/pdf')
    async downloadParamsPdf(@Param('id') id: number, @Res() response: Response) {
        return await this.supplierQuotationService.downloadParamsPdf(id, response);
    }
    // @UseGuards(JwtAuthGuard)
    @Get('excel')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.supplierQuotationService.downloadExcel(request, response);
    }
    @Get('excel/:id')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel1(@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.supplierQuotationService.downloadExcel1(id, response);
    }

    // @UseGuards(JwtAuthGuard)
	// @Post('save')
	// @UseInterceptors(FileInterceptor('file'))
	// uploadFile(@UploadedFile() file: Express.Multer.File, @Body() supplierQuotationDTO: SupplierQuotationDTO) {
    // return this.supplierQuotationService.create(file, supplierQuotationDTO);
	// }

    @Post("save")
    create(@Body() supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
        return this.supplierQuotationService.create(supplierQuotationDTO);
    }


    // @UseGuards(JwtAuthGuard)
	// @Put("update")
	// @UseInterceptors(FileInterceptor('file'))
	// uploadFile1(@UploadedFile() file: Express.Multer.File, @Body() supplierQuotationDTO: SupplierQuotationDTO) {
	// 	return this.supplierQuotationService.update(file, supplierQuotationDTO);
	// }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
        return this.supplierQuotationService.update( supplierQuotationDTO);
    }


    // @UseGuards(JwtAuthGuard)
	// @Post("save")
	// create(@Body() supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
	// 	console.log("purchasereqslipDTO",supplierQuotationDTO);
	// 	return this.supplierQuotationService.create(supplierQuotationDTO);
	// }

	// @UseGuards(JwtAuthGuard)
	// @Put("update")
	// update(@Body() supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
	// 	return this.supplierQuotationService.update(supplierQuotationDTO);
	// }

    @Get('findAll')
    findAll(): Promise<Supplierquotation001wb[]> {
        return this.supplierQuotationService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Supplierquotation001wb> {
        return this.supplierQuotationService.findOne(id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('UpdateSupplierQuotation/:approvel/:pchaseslno/:remarks')
    UpdateSupplierQuotation(@Param('approvel') approvel: any, @Param('pchaseslno') pchaseslno: any,@Param('remarks') remarks: any): Promise<Supplierquotation001wb> {
        console.log("approvel",approvel);
        return this.supplierQuotationService.UpdateSupplierQuotation(approvel, pchaseslno,remarks);
    }
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.supplierQuotationService.remove(id);
    }
}