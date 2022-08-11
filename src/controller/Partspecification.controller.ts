import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PartspecificationDTO } from "src/dto/Partspecification.dto";
import { Partspecification001wb } from "src/entity/Partspecification001wb";
import { PartspecificationService } from "src/service/Partspecification.service";




@Controller(`/testandreportstudio/api/partspecific`)
export class PartspecifcationController {
	constructor(private readonly partspecificationService: PartspecificationService) { }

    @UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() partspecificationDTO: PartspecificationDTO) {
		return this.partspecificationService.create(partspecificationDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() partspecificationDTO: PartspecificationDTO) {
		return this.partspecificationService.update( partspecificationDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Partspecification001wb[]> {
		return this.partspecificationService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.partspecificationService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Partspecification001wb> {
		return this.partspecificationService.findOne(id);
	}

}