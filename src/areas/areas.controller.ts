import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Area } from 'orm/entity/area.entity';
import { AreasService } from './areas.service';

@Crud({
    model: {
        type: Area,
    },
    query: {
        join: {
            zones: { eager: true },
        },
    },
})
@Controller('areas')
export class AreasController {
    constructor(public service: AreasService) {}
}
