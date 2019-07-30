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
    async notify(@Body() data, @Req() req) {
        // we have to check req.readable because of raw-body issue #57
        // https://github.com/stream-utils/raw-body/issues/57
        if (req.readable) {
            // body is ignored by NestJS -> get raw body from request
            const raw = await rawbody(req);
            const text = raw.toString().trim();
            console.log('body:', text);
    
        } else {
            // body is parsed by NestJS
            console.log('data:', data);
        }
    }
}
