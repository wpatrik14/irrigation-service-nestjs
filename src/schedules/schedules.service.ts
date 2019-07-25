import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Schedule } from 'orm/entity/schedule.entity';

@Injectable()
export class SchedulesService extends TypeOrmCrudService<Schedule> {
    constructor(@InjectRepository(Schedule) repo) {
        super(repo);
    }
}
