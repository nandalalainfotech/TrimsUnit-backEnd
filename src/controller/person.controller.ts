import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PersonDTO } from "src/dto/person.dto";
import { Person001mb } from "src/entity/Person001mb";
import { PersonService } from "src/service/person.service";

@Controller('/testandreportstudio/api/person')
export class PersonController {
    constructor(private readonly personService: PersonService) { }
    // --------------------------user registration-------------
    @Post("regSave")
    create1(@Body() personDTO: PersonDTO): Promise<Person001mb> {
        return this.personService.create(personDTO);
    }

    @Get('regFindAll')
    findAll1(): Promise<Person001mb[]> {
        return this.personService.findAll();
    }
    // --------------------------user registration-------------
    @UseGuards(JwtAuthGuard)
    @Post("save")
    create(@Body() personDTO: PersonDTO): Promise<Person001mb> {
        return this.personService.create(personDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() personDTO: PersonDTO): Promise<Person001mb> {
        return this.personService.update(personDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get('findAll')
    findAll(): Promise<Person001mb[]> {
        return this.personService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Person001mb> {
        return this.personService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.personService.remove(id);
    }
}