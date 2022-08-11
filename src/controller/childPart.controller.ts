import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChildPartDTO } from "src/dto/Childpart.dto";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { ChildPartService } from "src/service/ChildPart.service";


@Controller(`/testandreportstudio/api/childpart`)

export class ChildPartController {
	constructor(private readonly childPartService: ChildPartService) { }

    @UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() childPartDTO: ChildPartDTO) {
		return this.childPartService.create(childPartDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() childPartDTO: ChildPartDTO) {
		return this.childPartService.update( childPartDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Childpart001mb[]> {
		return this.childPartService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.childPartService.remove(slNo);
	}

	@UseGuards(JwtAuthGuard)
	@Get('getCount')
	getCount(): Promise<string> {
		return this.childPartService.getCount();
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Childpart001mb> {
		return this.childPartService.findOne(id);
	}

}