import { Injectable } from '@nestjs/common';
import { Soil } from 'orm/entity/soil.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class SoilsService extends TypeOrmCrudService<Soil> {
    constructor(@InjectRepository(Soil) repo) {
        super(repo);
    }
}
