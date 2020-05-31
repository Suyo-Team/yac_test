import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from '../config';
import * as firebase from 'firebase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3050);
}

firebase.initializeApp(Config);

bootstrap();
