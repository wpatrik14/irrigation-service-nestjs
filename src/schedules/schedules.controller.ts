import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Schedule } from 'orm/entity/schedule.entity';
import { SchedulesService } from './schedules.service';

@Crud({
    model: {
        type: Schedule,
    },
})
@Controller('schedules')
export class SchedulesController {
    constructor(public service: SchedulesService) {}
}
