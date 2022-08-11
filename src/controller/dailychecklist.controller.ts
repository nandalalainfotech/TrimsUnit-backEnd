import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { DailyChecklistDTO } from "src/dto/DailyChecklist.dto";
import { Dailychecklist001wb } from "src/entity/Dailychecklist001wb";
import { DailyCheckListService } from "src/service/dailychecklist.service";
import { Response } from "express";
import { Request } from "supertest";
var path = require('path');
const fs = require('fs')


@Controller('/testandreportstudio/api/dailychecklist')
export class DailyCheckListController {
    constructor(private readonly dailyChecklistService: DailyCheckListService) { }

    @UseGuards(JwtAuthGuard)
    @Get('findAll')
    findAll(): Promise<Dailychecklist001wb[]> {
        return this.dailyChecklistService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("save")
    create(@Body() dailyChecklistDTO: DailyChecklistDTO): Promise<Dailychecklist001wb> {
        return this.dailyChecklistService.create(dailyChecklistDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() dailyChecklistDTO: DailyChecklistDTO): Promise<Dailychecklist001wb> {
        return this.dailyChecklistService.update(dailyChecklistDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:slNo')
    remove(@Param('slNo') slNo: number): Promise<void> {
        return this.dailyChecklistService.remove(slNo);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Dailychecklist001wb> {
        return this.dailyChecklistService.findOne(id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('findAllByMachineId/:mslno')
    findAllByMachineId(@Param('mslno') mslno: number): Promise<Dailychecklist001wb[]> {
        return this.dailyChecklistService.findAllByMachineId(mslno);
    }

    @Get('pdf/:mslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.dailyChecklistService.downloadPdf(mslno, request, response);
	}


    @Get('excel/:mslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.dailyChecklistService.downloadExcel(mslno, request, response);
    }
}