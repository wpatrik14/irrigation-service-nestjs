import { Controller, Get, Param } from '@nestjs/common';
import { Zone } from 'orm/entity/zone.entity';
import { ZonesService } from './zones.service';

@Controller('zones')
export class ZonesController {

    constructor(private readonly zonesService: ZonesService) {}

    @Get()
    findAll(): Promise<Zone[]> {
        return this.zonesService.findAll();
    }

    @Get(':id')
    find(@Param('id') id: number): Promise<Zone> {
        return this.zonesService.find(id);
    }
}
