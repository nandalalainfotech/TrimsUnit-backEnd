import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UnitDepartMasterDTO } from "src/dto/unitdepartmaster.dto";
import { Unitdeptmaster001mb } from "src/entity/Unitdeptmaster001mb";
import { UnitDepartMasterService } from "src/service/unitdepartmaster.service";

@Controller('/testandreportstudio/api/unitdepartment')
export class UnitDepartMasterController {
    constructor(private readonly unitDepartMasterService: UnitDepartMasterService) { }

    @Get('findAll')
    findAll(): Promise<Unitdeptmaster001mb[]> {
        return this.unitDepartMasterService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("save")
    create(@Body() unitDepartMasterDTO: UnitDepartMasterDTO): Promise<Unitdeptmaster001mb> {
        return this.unitDepartMasterService.create(unitDepartMasterDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() unitDepartMasterDTO: UnitDepartMasterDTO): Promise<Unitdeptmaster001mb> {
        return this.unitDepartMasterService.update(unitDepartMasterDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Unitdeptmaster001mb> {
        return this.unitDepartMasterService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.unitDepartMasterService.remove(id);
    }
}