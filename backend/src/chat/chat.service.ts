import { Injectable } from '@nestjs/common';
import { Message } from './chat.interface';
import * as firebase from 'firebase';

@Injectable()
export class ChatService {
  private database;
  constructor() {
    this.database = firebase.database().ref('chat');
  }

  create(msg: Message) {
    msg.date = Date.now();
    this.database.push(msg);
    return this.database
      .limitToLast(1)
      .orderByChild('date')
      .once('value')
      .then(function (snapshot) {
        return { ...snapshot.val() };
      })
      .catch(function (error) {
        return error;
      });
  }

  getMessages(): Message[] {
    return this.database.once('value').then(function (snapshot) {
      return snapshot.val() || [];
    });
  }
}
