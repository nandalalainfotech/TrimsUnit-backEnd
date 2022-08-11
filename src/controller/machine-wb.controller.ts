import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MachineWBDTO } from "src/dto/Machine-wb.dto";
import { Machine001wb } from "src/entity/Machine001wb";

import { MachineWBService } from "src/service/machine-wb.service";

@Controller('/testandreportstudio/api/machineswb')
export class MachineWBController {
	constructor(private readonly machineWBService: MachineWBService) { }

	@UseGuards(JwtAuthGuard)
	@Post("save")
	create(@Body() machineWBDTO: MachineWBDTO): Promise<Machine001wb> {
		return this.machineWBService.create(machineWBDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() machineWBDTO: MachineWBDTO): Promise<Machine001wb> {
		return this.machineWBService.update(machineWBDTO);
	}

    @UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Machine001wb[]> {
		return this.machineWBService.findAll();
	}
	
    @UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Machine001wb> {
		return this.machineWBService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.machineWBService.remove(id);
	}
}