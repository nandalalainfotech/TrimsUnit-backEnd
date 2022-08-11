import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Response } from "express";
import { Request } from "supertest";
import { PurchaseableService } from "src/service/purchaseable.service";
import { Purchaseable001mb } from "src/entity/Purchaseable001mb";
import { PurchaseableDTO } from "src/dto/purchaseable.dto";

var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/purchaseable')
export class PurchaseableController {
	constructor(private readonly purchaseableService: PurchaseableService) { }

	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() purchaseableDTO: PurchaseableDTO): Promise<Purchaseable001mb> {
		return this.purchaseableService.create(purchaseableDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() purchaseableDTO: PurchaseableDTO): Promise<Purchaseable001mb> {
		return this.purchaseableService.update(purchaseableDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Purchaseable001mb[]> {
		return this.purchaseableService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.purchaseableService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Purchaseable001mb> {
		return this.purchaseableService.findOne(id);
	}
}