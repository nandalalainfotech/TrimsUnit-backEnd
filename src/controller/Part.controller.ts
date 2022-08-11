import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PartDTO } from "src/dto/Part.dto";
import { Part001mb } from "src/entity/Part001mb";
import { PartService } from "src/service/Part.service";


@Controller(`/testandreportstudio/api/part`)

export class PartController {
	constructor(private readonly partService: PartService) { }

    @UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() partDTO: PartDTO) {
		return this.partService.create(partDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() partDTO: PartDTO) {
		return this.partService.update( partDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Part001mb[]> {
		return this.partService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.partService.remove(slNo);
	}
	@UseGuards(JwtAuthGuard)
	@Get('getCount')
	getCount(): Promise<string> {
		return this.partService.getCount();
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Part001mb> {
		return this.partService.findOne(id);
	}

}