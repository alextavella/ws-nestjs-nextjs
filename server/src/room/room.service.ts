import { Injectable } from '@nestjs/common';
import { Participant, RoomData, RoomDto } from './room.dto';

@Injectable()
export class RoomService {
  private static rooms: Map<string, RoomData> = new Map();
  private static participants: Map<string, string> = new Map(); // sockedId => roomId

  create(data: RoomDto) {
    const roomId = data.roomId;
    // if (RoomService.rooms.has(roomId)) {
    //   throw new ConflictException({
    //     code: 'room.conflict',
    //     message: `Room with '${roomId}' already exists`,
    //   });
    // }

    const room = new RoomData(data.roomId, data.userId);
    room.participants.set(data.userId, data.username);

    RoomService.participants.set(data.userId, roomId);
    RoomService.rooms.set(roomId, room);

    return room;
  }

  access(data: RoomDto) {
    const roomId = data.roomId;
    // if (RoomService.rooms.has(roomId)) {
    //   throw new ConflictException({
    //     code: 'room.conflict',
    //     message: `Room with '${roomId}' already exists`,
    //   });
    // }

    const room = RoomService.rooms.get(roomId);
    room.participants.set(data.userId, data.username);

    RoomService.participants.set(data.userId, roomId);
    RoomService.rooms.set(roomId, room);

    return room;
  }

  leave(data: Participant) {
    const roomId = RoomService.participants.get(data.userId);
    // if (!RoomService.rooms.has(roomId)) {
    //   throw new ConflictException({
    //     code: 'room.conflict',
    //     message: `Room with '${roomId}' already exists`,
    //   });
    // }

    const room = RoomService.rooms.get(roomId);

    room.participants.delete(data.userId);

    if (room.participants.size === 0) {
      RoomService.rooms.delete(roomId);
      return;
    }

    room.createdBy = room.participants.keys().next().value;
  }
}
