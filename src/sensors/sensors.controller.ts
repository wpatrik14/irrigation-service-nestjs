import { Controller, Post, Req, Get, Param, Query, Body, Logger } from '@nestjs/common';
import { Sensor } from 'orm/entity/sensor.entity';
import { Crud } from '@nestjsx/crud';
import { SensorsService } from './sensors.service';
import * as rawbody from 'raw-body';
import { SensorView } from 'src/entities';
import { SensorsGateway } from './sensors.gateway';

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
    constructor(public service: SensorsService, public gateway: SensorsGateway) {}

    @Post('notify')
    async notify(@Body() data: any) {
        const sensor = await this.service.findOne(data.clientId);
        const sensorView: SensorView = {
            clientId: sensor.clientId,
            endpoint: sensor.endpoint,
            values: [
                {
                    insertedOnUTC: new Date(),
                    type: data.type,
                    unit: data.unit,
                    value: data.value,
                }
            ]
        };
        this.gateway.notifyClients(sensorView);
    }

    @Get(':clientId/:type')
    async getAllForClient(
        @Param('clientId') clientId: string, 
        @Param('type') type: string,
        @Query('limit') limit: number) {
        return this.service.getAllForClient(clientId, type, limit);
    }

    @Get('types')
    async getTypes(@Query('clientId') clientId: string) {
        return this.service.getTypes(clientId);
    }
}
