import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from 'orm/entity/sensor.entity';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';
import { SensorsGateway } from './sensors.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Sensor])],
    controllers: [SensorsController],
    providers: [SensorsService, SensorsGateway ],
    exports: [SensorsService],
})
export class SensorsModule {}
