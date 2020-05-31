import { Module } from '@nestjs/common';
import { ChatController } from './chat/chat.controller';
import { UserController } from './user/user.controller';
import { ChatService } from './chat/chat.service';
import { UserService } from './user/user.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  controllers: [ChatController, UserController],
  providers: [ChatService, UserService, ChatGateway],
})
export class AppModule {}
