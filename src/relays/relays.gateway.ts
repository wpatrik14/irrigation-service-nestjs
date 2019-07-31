import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Relay } from 'orm/entity/relay.entity';

@WebSocketGateway()
export class RelaysGateway {

    @WebSocketServer() server;

    async notifyClients(relay: Relay) {
        await this.server.emit('relayStateChanged', relay);
    }

    @SubscribeMessage('clientUpdate')
    async onClientUpdate(client, message){
        client.broadcast.emit('clientUpdate', message);
    }

}