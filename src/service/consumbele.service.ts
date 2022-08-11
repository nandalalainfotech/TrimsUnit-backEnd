import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConsumbleDTO } from "src/dto/comsumble.dto";
import { PartDTO } from "src/dto/Part.dto";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { getManager, Repository } from "typeorm";



@Injectable()
export class ConsumbleService {
    constructor(

        @InjectRepository(Consumble001mb) private readonly consumbleRepository: Repository<Consumble001mb>) {
    }
    
    async create(consumbleDTO: ConsumbleDTO): Promise<Consumble001mb> {
        const consumble001mb = new Consumble001mb();
        consumble001mb.setProperties(consumbleDTO);
        return this.consumbleRepository.save(consumble001mb);
    }
    async update(consumbleDTO: ConsumbleDTO): Promise<Consumble001mb> {
        const consumble001mb = new Consumble001mb();
        consumble001mb.setProperties(consumbleDTO);
        await this.consumbleRepository.update({ slNo: consumble001mb.slNo }, consumble001mb);
        return consumble001mb;
    }

    async findAll(): Promise<Consumble001mb[]> {        
        return this.consumbleRepository.find()
    }
  
    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from consumble001mb',['row']);
        var string=JSON.stringify(result);
        return string;
    }


    findOne(id: number): Promise<Consumble001mb> {
        return this.consumbleRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.consumbleRepository.delete(slNo);
    }
}