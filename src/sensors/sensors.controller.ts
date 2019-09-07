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
    private readonly logger = new Logger(SensorsController.name);       
    constructor(public service: SensorsService, public gateway: SensorsGateway) {}

    @Post('notify')
    async notify(@Body() sensor: any) {
        this.logger.log(JSON.stringify(sensor));
    }

    @Get(':clientId/:type')
    async getAllForClient(@Param('clientId') clientId: string, @Param('type') type: string) {
        return this.service.getAllForClient(clientId, type);
    }

    @Get(':clientId/:type/latest')
    async getLatestForClient(@Param('clientId') clientId: string, @Param('type') type: string) {
        return this.service.getLatestForClient(clientId, type);
    }

    @Get('types')
    async getTypes(@Query('clientId') clientId: string) {
        return this.service.getTypes(clientId);
    }
}
