import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChildPartDTO } from "src/dto/Childpart.dto";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { getManager, Repository } from "typeorm";



@Injectable()
export class ChildPartService {
    constructor(

        @InjectRepository(Childpart001mb) private readonly childPartRepository: Repository<Childpart001mb>) {
    }
    
    async create(childPartDTO: ChildPartDTO): Promise<Childpart001mb> {
        const childpart001mb = new Childpart001mb();
        childpart001mb.setProperties(childPartDTO);
        return this.childPartRepository.save(childpart001mb);
    }
    async update(childPartDTO: ChildPartDTO): Promise<Childpart001mb> {
        const childpart001mb = new Childpart001mb();
        childpart001mb.setProperties(childPartDTO);
        await this.childPartRepository.update({ slNo: childpart001mb.slNo }, childpart001mb);
        return childpart001mb;
    }

    async findAll(): Promise<Childpart001mb[]> {        
        return this.childPartRepository.find()
    }
  
    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from childpart001mb',['row']);
        var string=JSON.stringify(result);
        return string;
    }

    findOne(id: number): Promise<Childpart001mb> {
        return this.childPartRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.childPartRepository.delete(slNo);
    }
}