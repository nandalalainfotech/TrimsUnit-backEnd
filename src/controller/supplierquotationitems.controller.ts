import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierquotationsItemDTO } from "src/dto/supplierQuotationsitem.dto";
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";
import { SupplierquotationitemsService } from "src/service/SupplierQuotationsitems.service";
import { Request } from "supertest";



@Controller('/testandreportstudio/api/supplierquotaitem')
export class SupplierquotationitemController {
	constructor(private readonly supplierquotationitemsService: SupplierquotationitemsService) { }
    
	@UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() supplierquotationsItemDTO: SupplierquotationsItemDTO) {
	return this.supplierquotationitemsService.create(supplierquotationsItemDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() supplierquotationsItemDTO: SupplierquotationsItemDTO) {
		return this.supplierquotationitemsService.update( supplierquotationsItemDTO);
	}
	
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Supplierquotationitems001wb[]> {
		return this.supplierquotationitemsService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.supplierquotationitemsService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Supplierquotationitems001wb> {
		return this.supplierquotationitemsService.findOne(id);
	}


}