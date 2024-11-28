import { Module } from '@nestjs/common';
import { AppWebsocketGateway } from './app.gateway';
import { RoomController } from './room/room.controller';
import { RoomService } from './room/room.service';

@Module({
  imports: [],
  controllers: [RoomController],
  providers: [RoomService, AppWebsocketGateway],
})
export class AppModule {}
