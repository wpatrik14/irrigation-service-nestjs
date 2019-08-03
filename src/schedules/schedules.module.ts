import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'orm/entity/schedule.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { RelaysModule } from 'src/relays/relays.module';
import { ZonesModule } from 'src/zones/zones.module';

@Module({
    imports: [TypeOrmModule.forFeature([Schedule]), RelaysModule, ZonesModule],
    controllers: [SchedulesController],
    providers: [SchedulesService],
    exports: [SchedulesService],
})
export class SchedulesModule {}
