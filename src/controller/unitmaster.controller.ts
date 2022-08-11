import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UnitMasterDTO } from "src/dto/usermaster.dto";
import { Unitmaster001mb } from "src/entity/Unitmaster001mb";
import { UnitMasterService } from "src/service/unitmaster.service";

@Controller('/testandreportstudio/api/unitmaster')
export class UnitMasterController {
    constructor(private readonly unitMasterService: UnitMasterService) { }

    @Get('findAll')
    findAll(): Promise<Unitmaster001mb[]> {
        return this.unitMasterService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("save")
    create(@Body() unitMasterDTO: UnitMasterDTO): Promise<Unitmaster001mb> {
        return this.unitMasterService.create(unitMasterDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() unitMasterDTO: UnitMasterDTO): Promise<Unitmaster001mb> {
        return this.unitMasterService.update(unitMasterDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Unitmaster001mb> {
        return this.unitMasterService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.unitMasterService.remove(id);
    }
}