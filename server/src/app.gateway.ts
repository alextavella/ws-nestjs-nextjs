import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Participant } from './app/app.dto';

@WebSocketGateway({
  namespace: 'server',
  cors: { origin: '*' },
})
export class AppWebsocketGateway {
  @WebSocketServer() server;

  // private static rooms: Map<string, RoomData> = new Map();
  // private static participants: Map<string, string> = new Map(); // sockedId => roomId

  private logger: Logger = new Logger('WorkSocket');

  handleConnection(socket: Socket): void {
    const socketId = socket.id;
    console.log(`New connecting... socket id:`, socketId);
    // AppWebsocketGateway.participants.set(socketId, '');
  }

  handleDisconnect(socket: Socket): void {
    const socketId = socket.id;
    console.log(`Disconnection... socket id:`, socketId);
    // const roomId = AppWebsocketGateway.participants.get(socketId);
    // const room = AppWebsocketGateway.rooms.get(roomId);
    // if (room) {
    //   room.participants.get(socketId).connected = false;
    //   this.server.emit(
    //     `room/${roomId}`,
    //     Array.from(room.participants.values()),
    //   );
    // }
  }

  afterInit(_: any): any {
    console.log('Gateway successfully inited');
  }

  @SubscribeMessage('notes')
  handleNotes(@MessageBody() data: string) {
    this.logger.log(data);
  }

  @SubscribeMessage('room')
  async onParticipate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() participant: Participant,
  ) {
    const socketId = socket.id;
    console.log(
      `Registering new participant... socket id: %s and participant: `,
      socketId,
      participant,
    );

    // const roomId = participant.roomId;
    // if (!AppWebsocketGateway.rooms.has(roomId)) {
    //   console.error(
    //     'Room with id: %s was not found, disconnecting the participant',
    //     roomId,
    //   );
    //   socket.disconnect();
    //   throw new ForbiddenException('The access is forbidden');
    // }

    // const room = AppWebsocketGateway.rooms.get(roomId);
    // AppWebsocketGateway.participants.set(socketId, roomId);
    // participant.connected = true;

    // room.participants.set(socketId, participant);

    // // when received new participant we notify the chatter by room
    // this.server.emit(
    //   `room/${roomId}/participants`,
    //   Array.from(room.participants.values()),
    // );
  }

  // @SubscribeMessage('selection')
  // handleRoom(
  //   @ConnectedSocket() socket: Socket,
  //   @MessageBody() message: SelectionDto,
  // ) {
  //   const socketId = socket.id;
  //   console.log(
  //     `Registering selection... socket id: %s and message: `,
  //     socketId,
  //     message,
  //   );

  //   const roomId = AppWebsocketGateway.participants.get(socketId);
  //   if (!AppWebsocketGateway.rooms.has(roomId)) {
  //     console.error(
  //       'Room with id: %s was not found, disconnecting the participant',
  //       roomId,
  //     );

  //     socket.disconnect();
  //     throw new ForbiddenException('The access is forbidden');
  //   }

  //   const room = AppWebsocketGateway.rooms.get(roomId);

  //   room.selections.push({
  //     createdAt: new Date(),
  //     content: message.content,
  //     username: message.username,
  //   });

  //   this.server.emit(`room/${roomId}/selections`, room.selections);
  // }

  // static createRoom(roomDto: RoomDto): RoomData {
  //   const roomId = roomDto.roomId;
  //   if (this.rooms.has(roomId)) {
  //     throw new ConflictException({
  //       code: 'room.conflict',
  //       message: `Room with '${roomId}' already exists`,
  //     });
  //   }

  //   const room = new RoomData(roomDto.username);
  //   this.rooms.set(roomId, room);
  //   return room;
  // }

  // static getRoom(roomDto: RoomDto): RoomData {
  //   const roomId = roomDto.roomId;
  //   const room = this.rooms.get(roomId);

  //   if (!room) {
  //     throw new ConflictException({
  //       code: 'room.conflict',
  //       message: `Room with '${roomId}' not found`,
  //     });
  //   }

  //   return room;
  // }
}
