import { Controller } from '@nestjs/common';
import { Sensor } from 'orm/entity/sensor.entity';
import { Crud } from '@nestjsx/crud';
import { SensorsService } from './sensors.service';

@Crud({
    model: {
        type: Sensor,
    },
    routes: {
        exclude: ['getManyBase'],
    },
})
@Controller('sensors')
export class SensorsController {
    constructor(public service: SensorsService) {}
}
