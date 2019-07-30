import { Controller, Post, Body } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Relay } from 'orm/entity/relay.entity';
import { RelaysService } from './relays.service';
import { RelayView } from 'src/entities';
import { SNS } from 'aws-sdk';

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
    async notify(@Body() body) {
        console.log(body);
    }
}
