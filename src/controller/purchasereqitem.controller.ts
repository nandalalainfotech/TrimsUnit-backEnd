import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PurchasereqslipitemDTO } from "src/dto/Purchasereqslipitem.dto";
import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";
import { PurchasereqslipitemService } from "src/service/purchasereqslipitem.service";
import { Request } from "supertest";



@Controller('/testandreportstudio/api/purchasereqitem')
export class PurchasereqitemController {
	constructor(private readonly purchasereqslipitemService: PurchasereqslipitemService) { }
    
	@UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() purchasereqslipitemDTO: PurchasereqslipitemDTO) {
	return this.purchasereqslipitemService.create(purchasereqslipitemDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() purchasereqslipitemDTO: PurchasereqslipitemDTO) {
		return this.purchasereqslipitemService.update( purchasereqslipitemDTO);
	}
	
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Purchasereqitem001wb[]> {
		return this.purchasereqslipitemService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.purchasereqslipitemService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Purchasereqitem001wb> {
		return this.purchasereqslipitemService.findOne(id);
	}


}