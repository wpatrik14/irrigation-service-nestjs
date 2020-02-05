import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Relay } from 'orm/entity/relay.entity';
import { RelayView } from 'src/entities';
import { IotData } from 'aws-sdk';

interface Schedule {
    relay: RelayView;
    timeout: NodeJS.Timeout;
}

@Injectable()
export class RelaysService extends TypeOrmCrudService<Relay> {
    private readonly logger = new Logger(RelaysService.name);
    private schedules: Schedule[] = [];

    constructor(@InjectRepository(Relay) repo) {
        super(repo);
    }

    async switch(relayView: RelayView) {
        const relay = await this.repo.findOne({ clientId: relayView.clientId, gpio: relayView.gpio });
        relay.status = relayView.status;
        const device = new IotData({
            endpoint: relay.endpoint,
            region: 'eu-central-1'
        });
        await device.publish({
            payload: JSON.stringify({ state: { desired: relayView } }),
            topic: '$aws/things/ESP32Relay/shadow/update',
            qos: 1
        }).promise();
        if (relayView.status) {
            relay.lastStartOnUTC = new Date();
            this.schedules.push({
                relay: relayView,
                timeout: setTimeout(async () => {
                    this.logger.log("Turning off");
                    relayView.status = !relayView.status;
                    await device.publish({
                        payload: JSON.stringify({ state: { desired: relayView } }),
                        topic: '$aws/things/ESP32Relay/shadow/update',
                        qos: 1
                    }).promise();
                    relay.status = !relay.status;
                    await this.repo.save(relay);
                }, relayView.duration * 60 * 1000)
            });
        } else {
            relay.lastEndOnUTC = new Date();
            const schedule = this.schedules.find(schedule => schedule.relay.clientId === relay.clientId && schedule.relay.gpio === relay.gpio);
            if (schedule) {
                clearTimeout(schedule.timeout);
            }
        }
        return await this.repo.save(relay);
    }
}
