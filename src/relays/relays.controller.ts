import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Relay } from 'orm/entity/relay.entity';
import { RelaysService } from './relays.service';
import { RelayView } from 'src/entities';
import * as rawbody from 'raw-body';
import { RelaysGateway } from './relays.gateway';

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
    constructor(public service: RelaysService, public gateway: RelaysGateway) {}

    @Post('switch')
    async switch(@Body() relayView: RelayView) {
        const relay = await this.service.switch(relayView);
        await this.gateway.notifyClients(relay);
        return relay;
    }
}
