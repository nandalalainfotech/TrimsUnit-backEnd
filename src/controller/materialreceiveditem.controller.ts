import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MaterialreceiveditemDTO } from "src/dto/materialreceiveditem.dto";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";
import { MaterialreceiveditemService } from "src/service/materialreceiveditem.service";
import { Request } from "supertest";



@Controller('/testandreportstudio/api/receiveditem')
export class MaterialreceiveditemController {
	constructor(private readonly materialreceiveditemService: MaterialreceiveditemService) { }
    
	@UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() materialreceiveditemDTO: MaterialreceiveditemDTO) {
		return this.materialreceiveditemService.create(materialreceiveditemDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() materialreceiveditemDTO: MaterialreceiveditemDTO) {
		return this.materialreceiveditemService.update( materialreceiveditemDTO);
	}
	

	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Materialreceiveditem001wb[]> {
		return this.materialreceiveditemService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.materialreceiveditemService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Materialreceiveditem001wb> {
		return this.materialreceiveditemService.findOne(id);
	}


}