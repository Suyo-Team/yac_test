import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import * as firebase from 'firebase';
import { Message } from './chat/chat.interface';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private database: firebase.database.Reference;
  private countUsers: number;
  private ids: string[];
  constructor() {
    this.database = firebase.database().ref('chat');
    this.countUsers = 0;
    this.ids = [];
  }
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('createMessage')
  async handleMessages(client: Socket, msg: Message): Promise<void> {
    let event = 'newMessage';
    msg.date = Date.now();
    await this.database.push(msg);
    const lastMsg = await this.database
      .limitToLast(1)
      .orderByChild('date')
      .once('value')
      .then(function (snapshot) {
        return { ...snapshot.val() };
      })
      .catch(function (error) {
        return { error };
      });
    if (lastMsg.error) {
      event = 'error';
    }
    return this.server.to(msg.room).emit(event, lastMsg);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: any): void {
    this.setId(data.id);
    client.join(data.room);
    this.server.to(data.room).emit('countUsers', this.ids.length);
  }

  @SubscribeMessage('leftRoom')
  handleLeaveRoom(client: Socket, data: any): void {
    this.removeId(data.id);
    console.log(this.ids.length);
    client.leave(data.room);
    this.server.to(data.room).emit('countUsers', this.ids.length);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    // this.logger.log(`Client connected: ${client.id}`);
  }

  setId(id: string) {
    if (!id) {
      return null;
    }
    let ids: string[] = [...this.ids];
    if (ids.indexOf(id) === -1) {
      ids.push(id);
      this.countUsers++;
    }
    this.ids = ids;
    return this.ids;
  }

  removeId(id: string) {
    if (!id) {
      return null;
    }
    let ids: string[] = [...this.ids];
    const index = ids.indexOf(id);
    console.log(index);
    if (index > -1) {
      ids.splice(index, 1);
      this.countUsers--;
    }
    this.ids = ids;
    return this.ids;
  }
}
