import { Logger } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";
import { Server } from "http";

@WebSocketGateway({
  namespace: 'server',
  cors: { origin: '*' }
})
export class AppGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('WorkSocket');

  handleConnection(client: Socket) {
    console.log('Connection detected');
    // this.logger.log(client);
  }

  handleDisconnect(client: any): any {
    console.log('Disconnection detected');
  }

  afterInit(server: any): any {
    console.log('Gateway successfully inited');
  }

  @SubscribeMessage('notes')
  handleNotes(@MessageBody() data: string) {
    this.logger.log(data)
  }
}