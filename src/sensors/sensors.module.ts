import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from 'orm/entity/sensor.entity';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';

@Module({
    imports: [TypeOrmModule.forFeature([Sensor])],
    controllers: [SensorsController],
    providers: [SensorsService],
    exports: [SensorsService],
})
export class SensorsModule {}
