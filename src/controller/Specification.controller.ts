import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SpecificationDTO } from "src/dto/Specification.dto";
import { Specification001wb } from "src/entity/Specification001wb";
import { SpecificationService } from "src/service/Specification.service";



@Controller(`/testandreportstudio/api/specification`)

export class SpecificationController {
	constructor(private readonly specificationService: SpecificationService) { }

    @UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() specificationDTO: SpecificationDTO) {
		return this.specificationService.create(specificationDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() specificationDTO: SpecificationDTO) {
		return this.specificationService.update( specificationDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Specification001wb[]> {
		return this.specificationService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.specificationService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Specification001wb> {
		return this.specificationService.findOne(id);
	}

}