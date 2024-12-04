import { findUserHandler } from './redis/findUser.handler.js';
import { joinSessionHandler } from './redis/joinSession.handler.js';
import config from '@peekaboo-ssr/config/session';

export const handlers = {
  client: {},
  pubsub: {
    [config.pubAction.FindUserRequest]: {
      handler: findUserHandler,
    },
    [config.pubAction.JoinSessionRequest]: {
      handler: joinSessionHandler,
    },
  },
};
