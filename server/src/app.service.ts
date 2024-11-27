import { Injectable } from '@nestjs/common';
import { AppGateway } from './app.gateway';

@Injectable()
export class AppService {
  constructor(private readonly gateway: AppGateway) {}

  private notes: string[] = []

  getHello(): string {
    return 'Hello World!';
  }

  addNote(note: string) {
    this.notes.push(note)
    this.gateway.server.emit('notes', { note });
  }

  getNotes(): string[] {
    return this.notes
  }
}
