import { Injectable } from '@nestjs/common';
import { Zone } from 'orm/entity/zone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ZonesService {

    constructor(@InjectRepository(Zone) private readonly zoneRepository: Repository<Zone>) {}

    findAll(): Promise<Zone[]> {
        return this.zoneRepository.find({relations: ['sensors', 'relay']});
    }

    find(id: number): Promise<Zone> {
        return this.zoneRepository.findOne(id, {relations: ['sensors', 'relay']});
    }
}
