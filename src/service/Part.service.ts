import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PartDTO } from "src/dto/Part.dto";
import { Part001mb } from "src/entity/Part001mb";
import { getManager, Repository } from "typeorm";



@Injectable()
export class PartService {
    constructor(

        @InjectRepository(Part001mb) private readonly PartRepository: Repository<Part001mb>) {
    }
    
    async create(partDTO: PartDTO): Promise<Part001mb> {
        const part001mb = new Part001mb();
        part001mb.setProperties(partDTO);
        return this.PartRepository.save(part001mb);
    }
    async update(partDTO: PartDTO): Promise<Part001mb> {
        const part001mb = new Part001mb();
        part001mb.setProperties(partDTO);
        await this.PartRepository.update({ slNo: part001mb.slNo }, part001mb);
        return part001mb;
    }

    async findAll(): Promise<Part001mb[]> {        
        return this.PartRepository.find()
    }
  
    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from part001mb',['row']);
        var string=JSON.stringify(result);
        return string;
    }


    findOne(id: number): Promise<Part001mb> {
        return this.PartRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.PartRepository.delete(slNo);
    }
}