import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { OrderItemwbDTO } from "src/dto/orderitem-wb.dto";

import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { OrderItemService } from "src/service/orderitem-wb.service";
import { Request } from "supertest";



@Controller('/testandreportstudio/api/orderitem')
export class OrderItemController {
	constructor(private readonly orderItemService: OrderItemService) { }
    
	@UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() orderItemwbDTO: OrderItemwbDTO) {
		return this.orderItemService.create(orderItemwbDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() orderItemwbDTO: OrderItemwbDTO) {
		return this.orderItemService.update( orderItemwbDTO);
	}
	

	// @UseGuards(JwtAuthGuard)
	// @Get('findAllByOrderId/:orderslno')
	// findAllByOrderId(@Param('orderslno') orderslno: number): Promise<Orderitem001wb[]> {
	// 	return this.orderItemService.findAllByOrderId(orderslno);
	// }
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Orderitem001wb[]> {
		return this.orderItemService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.orderItemService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Orderitem001wb> {
		return this.orderItemService.findOne(id);
	}


}