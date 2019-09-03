import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Relay } from 'orm/entity/relay.entity';
import { RelayView } from 'src/entities';
import { IotData } from 'aws-sdk';

@Injectable()
export class RelaysService extends TypeOrmCrudService<Relay> {
    constructor(@InjectRepository(Relay) repo) {
        super(repo);
    }

    async switch(relayView: RelayView) {
        const relay = await this.repo.findOne({ endpoint: relayView.endpoint, clientId: relayView.clientId, gpio: relayView.gpio });
        const device = new IotData({
            endpoint: relay.endpoint,
            region: 'eu-central-1'
        });
        await device.updateThingShadow({
            payload: JSON.stringify(relayView),
            thingName: relayView.clientId,
        }).promise();
    }

    async onUpdateMessage(relayView: RelayView) {
        const relay = await this.repo.findOne({ clientId: relayView.clientId, gpio: relayView.gpio });
        relay.status = relayView.status;
        if (relayView.status) {
            relay.lastStartOnUTC=new Date();
        } else {
            relay.lastEndOnUTC=new Date();
        }
        return await this.repo.save(relay);
    }
}
