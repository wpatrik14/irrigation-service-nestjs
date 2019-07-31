import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sensor } from 'orm/entity/sensor.entity';
import { SensorView } from 'src/entities';

@Injectable()
export class SensorsService extends TypeOrmCrudService<Sensor> {
    constructor(@InjectRepository(Sensor) repo) {
        super(repo);
    }

    async onUpdatedValue(sensorView: SensorView) {
        const sensor = await this.repo.findOne({ clientId: sensorView.clientId });
        sensor.updatedOnUTC = new Date();
        sensor.value = sensorView.value;
        return await this.repo.save(sensor);
    }
}
