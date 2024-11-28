import { IsNotEmpty } from 'class-validator';

export class RoomDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  username: string;
}

export class Participant {
  userId: string;
  username: string;
}

export class RoomData {
  roomId: string;
  createdBy: string;
  createdDate: Date;
  participants: Map<string, string>;
  selections: Array<Selection>;

  constructor(roomId: string, createdBy: string) {
    this.roomId = roomId;
    this.createdBy = createdBy;
    this.createdDate = new Date();
    this.participants = new Map();
    this.selections = new Array<Selection>();
  }

  get participantsName(): string[] {
    return Array.from(this.participants.values());
  }
}

export class RoomResponse {
  roomId: string;
  username: string;
  participants: string[];
  selections: Array<Selection>;
}
