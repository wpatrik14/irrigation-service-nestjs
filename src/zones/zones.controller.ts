import { Controller, Get } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Zone } from 'orm/entity/zone.entity';
import { ZonesService } from './zones.service';

@Crud({
    model: {
        type: Zone,
    },
    query: {
        join: {
            sensors: { eager: true },
            relay: { eager: true },
            schedules: { eager: true },
            forecast: { eager: true },
            plant: {},
            soil: {},
        },
    },
})
@Controller('zones')
export class ZonesController {
    constructor(public service: ZonesService) {}
}
