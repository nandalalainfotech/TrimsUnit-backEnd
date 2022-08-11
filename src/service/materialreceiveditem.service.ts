import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";
import { MaterialreceiveditemDTO } from "src/dto/materialreceiveditem.dto";




@Injectable()
export class MaterialreceiveditemService {
    constructor(
        @InjectRepository(Materialreceiveditem001wb) private readonly materialreceiveditemRepository: Repository<Materialreceiveditem001wb>) {
    }
    async create(materialreceiveditemDTO: MaterialreceiveditemDTO): Promise<Materialreceiveditem001wb> {
        const orderitem001wb = new Materialreceiveditem001wb();
        orderitem001wb.setProperties(materialreceiveditemDTO);
        return this.materialreceiveditemRepository.save(orderitem001wb);
    }
    async update(materialreceiveditemDTO: MaterialreceiveditemDTO): Promise<Materialreceiveditem001wb> {
        const orderitem001wb = new Materialreceiveditem001wb();
        orderitem001wb.setProperties(materialreceiveditemDTO);
        await this.materialreceiveditemRepository.update({ slNo: orderitem001wb.slNo }, orderitem001wb);
        return orderitem001wb;
    }

    async findAll(): Promise<Materialreceiveditem001wb[]> {
        return this.materialreceiveditemRepository.find()
    }

    findOne(id: number): Promise<Materialreceiveditem001wb> {
        return this.materialreceiveditemRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.materialreceiveditemRepository.delete(slNo);
    }
}