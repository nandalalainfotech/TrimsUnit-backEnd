import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MaterialinspectionDTO } from "src/dto/Materialinspection.dto";
import { Materialinspection001wb } from "src/entity/MaterialInspection001wb";
import { getManager, Repository } from "typeorm";



@Injectable()
export class MaterialinspectionService {
    constructor(

        @InjectRepository(Materialinspection001wb) private readonly materialinspectionRepository: Repository<Materialinspection001wb>) {
    }

    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from Materialinspection001wb', ['row']);
        var string = JSON.stringify(result);
        return string;
    }
    
    async create(materialinspectionDTO: MaterialinspectionDTO): Promise<Materialinspection001wb> {
        const materialinspection001wb = new Materialinspection001wb();
        materialinspection001wb.setProperties(materialinspectionDTO);
        return this.materialinspectionRepository.save(materialinspection001wb);
    }
    async update(materialinspectionDTO: MaterialinspectionDTO): Promise<Materialinspection001wb> {
        const materialinspection001wb = new Materialinspection001wb();
        materialinspection001wb.setProperties(materialinspectionDTO);
        await this.materialinspectionRepository.update({ slNo: materialinspection001wb.slNo }, materialinspection001wb);
        return materialinspection001wb;
    }

    async findAll(): Promise<Materialinspection001wb[]> {
        return this.materialinspectionRepository.find()
    }
  

    findOne(id: number): Promise<Materialinspection001wb> {
        return this.materialinspectionRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.materialinspectionRepository.delete(slNo);
    }
}