import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sensor } from 'orm/entity/sensor.entity';

@Injectable()
export class SensorsService extends TypeOrmCrudService<Sensor> {
    constructor(@InjectRepository(Sensor) repo) {
        super(repo);
    }
}
