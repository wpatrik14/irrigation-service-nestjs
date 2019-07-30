import { Controller, Post, Body, Req } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Relay } from 'orm/entity/relay.entity';
import { RelaysService } from './relays.service';
import { RelayView } from 'src/entities';
import * as rawbody from 'raw-body';

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
    async switch(@Body() relayView: RelayView) {
        return this.service.switch(relayView);
    }

    @Post('notify')
    async notify(@Req() req) {
        if (req.readable) {
            const raw = await rawbody(req);
            const text = JSON.parse(raw.toString().trim());
            console.log('body:', text);
    
        }
    }
}
