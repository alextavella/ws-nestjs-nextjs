import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/notes')
  getNotes() {
    const notes = this.appService.getNotes()
    return { notes }
  }

  @Post('/notes')
  @HttpCode(201)
  addNote(@Body('note') note: string) {
    this.appService.addNote(note)
    return { note }
  }
}
