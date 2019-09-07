import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Relay } from 'orm/entity/relay.entity';
import { RelayView } from 'src/entities';
import { IotData } from 'aws-sdk';

@Injectable()
export class RelaysService extends TypeOrmCrudService<Relay> {
    private readonly logger = new Logger(RelaysService.name);
    
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
            payload: JSON.stringify({state: {desired: relayView }}), 
            topic: '$aws/things/ESP32Relay/shadow/update', 
            qos: 1 
        }).promise();
        if (relayView.status) {
            relay.lastStartOnUTC=new Date();
            setTimeout(async () => {
                this.logger.log("Turning off");
                relayView.status = !relayView.status;
                await device.publish({
                    payload: JSON.stringify({state: {desired: relayView }}), 
                    topic: '$aws/things/ESP32Relay/shadow/update', 
                    qos: 1 
                }).promise();
                relay.status = !relay.status;
                await this.repo.save(relay);
            }, relayView.duration*60*1000);
        } else {
            relay.lastEndOnUTC=new Date();
        }        
        return await this.repo.save(relay);
    }
}
