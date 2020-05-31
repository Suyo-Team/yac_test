import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateNewMessageDto } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('/save-message')
  create(@Body() createNewMessageDto: CreateNewMessageDto) {
    return this.chatService.create(createNewMessageDto);
  }

  @Get('/get-message')
  getMessages() {
    return this.chatService.getMessages();
  }
}
