import { io } from 'socket.io-client';
import _ from 'lodash';

import config from 'src/config';
import store from 'src/redux_store';

const RECONNECTION_ATTEMPTS = 10;
const RECONNECTION_DELAY = 1000;
const RECONNECTION_DELAY_MAX = 5000;

class WebsocketClient {
  [x: string]: any;
  constructor() {
    this.io = null;
  }

  initialize(userToken: string) {
    this.io = io(config.baseUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: RECONNECTION_ATTEMPTS,
      reconnectionDelay: RECONNECTION_DELAY,
      reconnectionDelayMax: RECONNECTION_DELAY_MAX,
      auth: {
        token: userToken,
      },
    });

    this.listen();
  }

  listen() {
    console.log('Hello');
  }

  disconnect() {
    if (this.io) {
      this.io.disconnect();
    }
  }
}

export default new WebsocketClient();
