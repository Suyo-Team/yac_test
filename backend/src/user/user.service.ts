import { Injectable } from '@nestjs/common';
import { User, UserResponse } from './user.interface';
import * as firebase from 'firebase';

@Injectable()
export class UserService {
  private database;
  constructor() {
    this.database = firebase.database().ref('user');
  }
  async singIn(user: User) {
    const userInfo = await this.validateUser(user.name);
    if (userInfo && userInfo.error) {
      return { error: `Error ${userInfo.error}` };
    }
    return userInfo || { error: `User name doesn't exist` };
  }

  async validateUser(name: string) {
    const userInfo = await this.database
      .orderByChild('name')
      .equalTo(name)
      .once('value')
      .then(function (snapshot) {
        let userTmp = null;
        snapshot.forEach((data) => {
          userTmp = data.val();
          userTmp.key = data.key;
        });
        return userTmp;
      })
      .catch(function (error) {
        return { error };
      });
    return userInfo;
  }

  async signUp(user: User): Promise<UserResponse | string> {
    const userInfo = await this.validateUser(user.name);
    if (userInfo) {
      return 'This username has been used';
    }
    return await this.database
      .push(user)
      .once('value')
      .then(function (snapshot) {
        return { key: snapshot.key, ...snapshot.val() };
      });
  }
}
