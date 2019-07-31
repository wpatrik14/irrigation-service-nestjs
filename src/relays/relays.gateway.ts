import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { RelayView } from 'src/entities';

@WebSocketGateway()
export class RelaysGateway {

    @WebSocketServer() server;

    async notifyClients(relayView: RelayView) {
        await this.server.emit('relayStateChanged', relayView);
    }

    @SubscribeMessage('clientUpdate')
    async onClientUpdate(client, message){
        client.broadcast.emit('clientUpdate', message);
    }

}