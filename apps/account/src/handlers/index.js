import config from '@peekaboo-ssr/config/account';
import { loginRequestHandler } from './auth/login.handler.js';

const handlers = {
  [config.clientPacket.account.CreateUserRequest]: {
    handler: loginRequestHandler,
  },
};

export const getHandlerByPacketType = (packetType) => {
  const handler = handlers[packetType].handler;
  if (handler) {
    return handler;
  }
  console.error(`handler is not found.`);
};
