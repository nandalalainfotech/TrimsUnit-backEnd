import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UnitMasterDTO } from "src/dto/usermaster.dto";
import { Unitmaster001mb } from "src/entity/Unitmaster001mb";
import { Repository } from "typeorm";

@Injectable()
export class UnitMasterService {

    constructor(
        @InjectRepository(Unitmaster001mb) private readonly UnitmasterRepository: Repository<Unitmaster001mb>) {

    }

    async create(unitMasterDTO: UnitMasterDTO): Promise<Unitmaster001mb> {
        const unitMaster001mb = new Unitmaster001mb();
        unitMaster001mb.setProperties(unitMasterDTO);
        return this.UnitmasterRepository.save(unitMaster001mb);
    }

    async update(unitMasterDTO: UnitMasterDTO): Promise<Unitmaster001mb> {
        const unitMaster001mb = new Unitmaster001mb();
        unitMaster001mb.setProperties(unitMasterDTO);
        await this.UnitmasterRepository.update({ slNo: unitMaster001mb.slNo }, unitMaster001mb);
        return unitMaster001mb;
    }

    async findAll(): Promise<Unitmaster001mb[]> {
        return await this.UnitmasterRepository.find({ relations: ["deptslNo2"] });
    }

    findOne(id: number): Promise<Unitmaster001mb> {
        return this.UnitmasterRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.UnitmasterRepository.delete(id);
    }

}