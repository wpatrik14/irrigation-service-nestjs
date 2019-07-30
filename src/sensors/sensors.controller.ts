import { Controller, Post, Req } from '@nestjs/common';
import { Sensor } from 'orm/entity/sensor.entity';
import { Crud } from '@nestjsx/crud';
import { SensorsService } from './sensors.service';
import * as rawbody from 'raw-body';
import { SensorView } from 'src/entities';

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

    @Post('notify')
    async notify(@Req() req) {
        if (req.readable) {
            const raw = await rawbody(req);
            const body = JSON.parse(raw.toString().trim());
            console.log(`Received message from SNS: ${body}`);
            const sensorView: SensorView = JSON.parse(body.Message.toString().trim());
            return this.service.messageReceived(sensorView);    
        }
    }
}
