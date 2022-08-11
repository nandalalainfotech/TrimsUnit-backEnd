import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Request } from "supertest";
import { Response } from "express";
import { BankNameService } from "src/service/bank.service";
import { Bank001mb } from "src/entity/Bank001mb";
import { BankDTO } from "src/dto/bank.dto";




@Controller('/testandreportstudio/api/bank')
export class BankNameController {
	constructor(private readonly bankNameService: BankNameService) { }




	@Post("save")
	create(@Body() bankDTO: BankDTO): Promise<Bank001mb> {
		return this.bankNameService.create(bankDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() bankDTO: BankDTO): Promise<Bank001mb> {
		return this.bankNameService.update(bankDTO);
	}

    @UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Bank001mb[]> {
		return this.bankNameService.findAll();
	}

	
	
    @UseGuards(JwtAuthGuard)
	@Get(':slNo')
	findOne(@Param('slNo') slNo: number): Promise<Bank001mb> {
		return this.bankNameService.findOne(slNo);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.bankNameService.remove(id);
	}
}