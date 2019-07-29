import { Injectable } from '@nestjs/common';
import { Area } from 'orm/entity/area.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class AreasService extends TypeOrmCrudService<Area> {
    constructor(@InjectRepository(Area) repo) {
        super(repo);
    }
}
