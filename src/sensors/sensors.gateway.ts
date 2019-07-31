import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Relay } from 'orm/entity/relay.entity';
import { Sensor } from 'orm/entity/sensor.entity';

@WebSocketGateway()
export class SensorsGateway {

    @WebSocketServer() server;

    async notifyClients(sensor: Sensor) {
        await this.server.emit('sensorValueChanged', sensor);
    }

    @SubscribeMessage('clientUpdate')
    async onClientUpdate(client, message){
        client.broadcast.emit('clientUpdate', message);
    }

}