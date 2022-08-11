import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Custemerregistration001mb } from "src/entity/Custemerregistration001mb";
import { CustemerRegistrationDTO } from "src/dto/custemerRegistration.dto";

var path = require('path');
const excel = require('exceljs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class CustemerRegistrationService {
    constructor(
        @InjectRepository(Custemerregistration001mb) private readonly custemerRegRepository: Repository<Custemerregistration001mb>) {
    }

    async create(custemerRegDTO: CustemerRegistrationDTO): Promise<Custemerregistration001mb> {
        const custemerregistration001mb = new Custemerregistration001mb();
        custemerregistration001mb.setProperties(custemerRegDTO);
        return this.custemerRegRepository.save(custemerregistration001mb);
    }

    async update(custemerRegDTO: CustemerRegistrationDTO): Promise<Custemerregistration001mb> {
        const custemerregistration001mb = new Custemerregistration001mb();
        custemerregistration001mb.setProperties(custemerRegDTO);
        await this.custemerRegRepository.update({ slNo: custemerregistration001mb.slNo },
            custemerregistration001mb);
        return custemerregistration001mb;
    }

    async findAll(): Promise<Custemerregistration001mb[]> {
        return this.custemerRegRepository.find();
    }

    async findAllSlNoAndSuppcode(): Promise<Custemerregistration001mb[]> {
        return this.custemerRegRepository.find();
    }

    findOne(id: number): Promise<Custemerregistration001mb> {
        return this.custemerRegRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.custemerRegRepository.delete(id);
    }

}

