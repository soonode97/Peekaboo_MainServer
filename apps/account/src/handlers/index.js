import config from '@peekaboo-ssr/config/account';
import { loginRequestHandler } from './client/auth/login.handler.js';

export const handlers = {
  client: {
    [config.clientPacket.account.LoginRequest]: {
      handler: loginRequestHandler,
    },
  },
  pubsub: {},
};
