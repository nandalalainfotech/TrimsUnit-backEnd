import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CustemerwbDTO } from "src/dto/Custemerwb.dto";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { CustemerService } from "src/service/Custemer-wb-service";
import { Request } from "supertest";



@Controller('/testandreportstudio/api/custemerwb')
export class CustemerController {
	constructor(private readonly custemerService: CustemerService) { }
    
	@UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() custemerwbDTO: CustemerwbDTO) {
		return this.custemerService.create(custemerwbDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() custemerwbDTO: CustemerwbDTO) {
		return this.custemerService.update( custemerwbDTO);
	}
	
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Custemer001wb[]> {
		return this.custemerService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.custemerService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Custemer001wb> {
		return this.custemerService.findOne(id);
	}


}