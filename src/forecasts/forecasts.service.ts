import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Forecast } from 'orm/entity/forecast.entity';

@Injectable()
export class ForecastsService extends TypeOrmCrudService<Forecast> {
    constructor(@InjectRepository(Forecast) repo) {
        super(repo);
    }
}
