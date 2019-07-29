import { Controller, Post, Body } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Relay } from 'orm/entity/relay.entity';
import { RelaysService } from './relays.service';
import { RelayView } from 'src/entities';

@Crud({
    model: {
        type: Relay,
    },
    routes: {
        exclude: ['getManyBase'],
    },
})
@Controller('relays')
export class RelaysController {
    constructor(public service: RelaysService) {}

    @Post('switch')
    async switchZone(@Body() relayView: RelayView) {
        return this.service.switch(relayView);
    }
}
