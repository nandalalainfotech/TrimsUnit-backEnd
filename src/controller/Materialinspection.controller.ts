import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MaterialinspectionDTO } from "src/dto/Materialinspection.dto";
import { Materialinspection001wb } from "src/entity/MaterialInspection001wb";

import { MaterialinspectionService } from "src/service/Materialinspection.service";



@Controller(`/testandreportstudio/api/materialinspect`)
export class MaterialinspectionController {
	constructor(private readonly materialinspectionService: MaterialinspectionService) { }

    @UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() materialinspectionDTO: MaterialinspectionDTO) {
		return this.materialinspectionService.create(materialinspectionDTO);
	}

	 @UseGuards(JwtAuthGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.materialinspectionService.getCount();
    }

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() materialinspectionDTO: MaterialinspectionDTO) {
		return this.materialinspectionService.update( materialinspectionDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Materialinspection001wb[]> {
		return this.materialinspectionService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.materialinspectionService.remove(slNo);
	}
    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Materialinspection001wb> {
		return this.materialinspectionService.findOne(id);
	}

	



}