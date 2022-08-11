import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ConsumbleDTO } from "src/dto/comsumble.dto";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { ConsumbleService } from "src/service/consumbele.service";



@Controller(`/testandreportstudio/api/consumble`)

export class ConsumbleController {
	constructor(private readonly consumbleService: ConsumbleService) { }

    @UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() consumbleDTO: ConsumbleDTO) {
		return this.consumbleService.create(consumbleDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() consumbleDTO: ConsumbleDTO) {
		return this.consumbleService.update( consumbleDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Consumble001mb[]> {
		return this.consumbleService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.consumbleService.remove(slNo);
	}
	@UseGuards(JwtAuthGuard)
	@Get('getCount')
	getCount(): Promise<string> {
		return this.consumbleService.getCount();
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Consumble001mb> {
		return this.consumbleService.findOne(id);
	}

}