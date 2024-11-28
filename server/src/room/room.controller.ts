import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RoomDto, RoomResponse } from './room.dto';
import { RoomService } from './room.service';

@Controller({ path: '/room' })
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/')
  @HttpCode(201)
  createRoom(@Body() roomDto: RoomDto): RoomResponse {
    console.log('Creating room...', roomDto);
    try {
      const room = this.roomService.create(roomDto);
      return {
        username: roomDto.username,
        roomId: roomDto.roomId,
        participants: room.participantsName,
        selections: [],
      };
    } catch (e) {
      console.error('Failed to initiate room', e);
      throw e;
    }
  }

  @Post('/:roomId')
  @HttpCode(200)
  enjoyRoom(@Body() roomDto: RoomDto): RoomResponse {
    console.log('Enjoying room...', roomDto);
    try {
      const room = this.roomService.access(roomDto);
      return {
        username: roomDto.username,
        roomId: roomDto.roomId,
        participants: room.participantsName,
        selections: room.selections,
      };
    } catch (e) {
      console.error('Failed to enjoy room', e);
      throw e;
    }
  }
}
