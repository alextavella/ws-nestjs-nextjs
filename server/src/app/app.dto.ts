import { IsNotEmpty } from 'class-validator';

// export type Game = {
//   username: string;
//   room: GameRoom;
// };

export type GameRoom = {
  roomId: string;
  players: string[];
  selections: Array<Selection>;
};

export interface Participant {
  roomId: string;
  username: string;
  connected: boolean;
}

export interface Selection {
  username: string;
  content: string;
  createdAt: Date;
}

// export class RoomData {
//   createdBy: string;
//   createdDate: Date;
//   participants: Map<string, Participant>; // sockedId => Participant
//   selections: Array<Selection>;

//   constructor(createdBy: string) {
//     this.createdBy = createdBy;
//     this.createdDate = new Date();
//     this.participants = new Map();
//     this.selections = new Array<Selection>();
//   }
// }

// export class RoomDto {
//   @IsNotEmpty()
//   roomId: string;

//   @IsNotEmpty()
//   username: string;
// }

export class SelectionDto {
  socketId?: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  content: string;
}
