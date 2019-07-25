import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Plant } from 'orm/entity/plant.entity';

@Injectable()
export class PlantsService extends TypeOrmCrudService<Plant> {
    constructor(@InjectRepository(Plant) repo) {
        super(repo);
    }
}
