import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { SensorView } from 'src/entities';

@WebSocketGateway()
export class SensorsGateway {

    @WebSocketServer() server;

    async notifyClients(sensor: SensorView) {
        await this.server.emit('sensorValueChanged', sensor);
    }

    @SubscribeMessage('clientUpdate')
    async onClientUpdate(client, message){
        client.broadcast.emit('clientUpdate', message);
    }

}