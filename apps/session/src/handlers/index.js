import { findUserHandler } from './redis/findUser.handler.js';

export const handlers = {
  client: {},
  pubsub: {
    findUser: {
      handler: findUserHandler,
    },
  },
};
