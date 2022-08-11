import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MachineDTO } from "src/dto/Machine.dto";
import { Machine001mb } from "src/entity/Machine001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { MachineSettingService } from "src/service/machine.service";
import { Response } from "express";
import { Request } from "supertest";
import { Fixture001mb } from "src/entity/Fixture001mb";
import { FixtureDTO } from "src/dto/fixture.dto";
import { FixtureSettingService } from "src/service/fixture.service";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/fixtures')
export class FixtureController {
	constructor(private readonly fixtureService: FixtureSettingService) { }

	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {
		return await this.fixtureService.downloadPdf(request, response);
	}


	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        return await this.fixtureService.downloadExcel(request, response);
    }


	@Post("save")
	create(@Body() fixtureDTO: FixtureDTO): Promise<Fixture001mb> {
		return this.fixtureService.create(fixtureDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() fixtureDTO: FixtureDTO): Promise<Fixture001mb> {
		return this.fixtureService.update(fixtureDTO);
	}

    @UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Fixture001mb[]> {
		return this.fixtureService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllSlNoAndMcode')
	findAllSlNoAndMcode(): Promise<Fixture001mb[]> {
		return this.fixtureService.findAllSlNoAndMcode();
	}
	
    @UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Fixture001mb> {
		return this.fixtureService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.fixtureService.remove(id);
	}

}


