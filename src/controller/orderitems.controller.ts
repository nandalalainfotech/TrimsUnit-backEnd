import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { OrderItemMbDTO } from "src/dto/orderitems.dto";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { OrderItemMbService } from "src/service/orderitems.service";
import { Response } from "express";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/item')
export class OrderItemMbController {
	constructor(private readonly orderItemMbService: OrderItemMbService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
				return await this.orderItemMbService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {		
        return await this.orderItemMbService.downloadExcel(request, response);
    }

	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() orderItemMbDTO: OrderItemMbDTO): Promise<Orderitem001mb> {
		return this.orderItemMbService.create(orderItemMbDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() orderItemMbDTO: OrderItemMbDTO): Promise<Orderitem001mb> {
		return this.orderItemMbService.update(orderItemMbDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Orderitem001mb[]> {
		return this.orderItemMbService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('getCount')
	getCount(): Promise<string> {
		return this.orderItemMbService.getCount();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.orderItemMbService.remove(id);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':orderslno')
	findOne(@Param('orderslno') orderslno: number): Promise<Orderitem001mb> {
		return this.orderItemMbService.findOne(orderslno);
	}
}


