import * as firebase from "firebase/app";
import config from '../common/credentials'

import "firebase/firestore";
import 'firebase/auth';

const app = firebase.default.initializeApp(config);

export { app };
