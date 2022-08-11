import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UnitDepartMasterDTO } from "src/dto/unitdepartmaster.dto";
import { Unitdeptmaster001mb } from "src/entity/Unitdeptmaster001mb";
import { Repository } from "typeorm";

@Injectable()
export class UnitDepartMasterService {

    constructor(
        @InjectRepository(Unitdeptmaster001mb) private readonly UnitmasterRepository: Repository<Unitdeptmaster001mb>) {

    }

    async create(unitDepartMasterDTO: UnitDepartMasterDTO): Promise<Unitdeptmaster001mb> {
        const unitdeptmaster001mb = new Unitdeptmaster001mb();
        unitdeptmaster001mb.setProperties(unitDepartMasterDTO);
        return this.UnitmasterRepository.save(unitdeptmaster001mb);
    }

    async update(unitDepartMasterDTO: UnitDepartMasterDTO): Promise<Unitdeptmaster001mb> {
        const unitdeptmaster001mb = new Unitdeptmaster001mb();
        unitdeptmaster001mb.setProperties(unitDepartMasterDTO);
        await this.UnitmasterRepository.update({ slNo: unitdeptmaster001mb.slNo }, unitdeptmaster001mb);
        return unitdeptmaster001mb;
    }

    async findAll(): Promise<Unitdeptmaster001mb[]> {
        return await this.UnitmasterRepository.find({ relations: ["unitslNo2", "departslNo2"] });
    }

    findOne(id: number): Promise<Unitdeptmaster001mb> {
        return this.UnitmasterRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.UnitmasterRepository.delete(id);
    }

}