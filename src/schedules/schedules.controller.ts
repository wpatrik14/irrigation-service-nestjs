import { Controller, Post, Body, Get, Delete, Param, Put } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ScheduleView } from 'src/entities';
import { Crud } from '@nestjsx/crud';
import { Schedule } from 'orm/entity/schedule.entity';

@Crud({
    model: {
        type: Schedule,
    },
    routes: {
        only: ['getManyBase','getOneBase'],
    },
})
@Controller('schedules')
export class SchedulesController {
    constructor(public schedulesService: SchedulesService) {}

    @Post()
    async create(@Body() schedule: ScheduleView) {
        return this.schedulesService.scheduleZone(schedule);
    }

    @Put(':id')
    async toogle(@Param('id') id: number, @Body() schedule: ScheduleView) {
        schedule.id = id;
        return this.schedulesService.toogleSchedule(schedule);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.schedulesService.deleteSchedule(id);
    }
}
