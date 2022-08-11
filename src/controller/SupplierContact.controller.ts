import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierContactDTO } from "src/dto/Suppliercontact.dto";
import { Suppliercontact001wb } from "src/entity/Suppliercontact001wb";
import { SupplierContactService } from "src/service/Suppliercontact.service";



@Controller(`/testandreportstudio/api/suppliercontact`)

export class SupplierContactController {
	constructor(private readonly supplierContactService: SupplierContactService) { }

    @UseGuards(JwtAuthGuard)
	@Post('save')
	create( @Body() supplierContactDTO: SupplierContactDTO) {
		return this.supplierContactService.create(supplierContactDTO);
	}

	@UseGuards(JwtAuthGuard)
	@Put("update")
	update(@Body() supplierContactDTO: SupplierContactDTO) {
		return this.supplierContactService.update( supplierContactDTO);
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('findAll')
	findAll(): Promise<Suppliercontact001wb[]> {
		return this.supplierContactService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('findAllbysupplierId/:poslNo')
	findAllbysupplierId(@Param('poslNo') poslNo: number): Promise<Suppliercontact001wb[]> {
		return this.supplierContactService.findAllbysupplierId(poslNo);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.supplierContactService.remove(slNo);
	}

    
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Suppliercontact001wb> {
		return this.supplierContactService.findOne(id);
	}

}