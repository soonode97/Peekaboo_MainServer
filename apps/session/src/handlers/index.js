import config from '@peekaboo-ssr/config/session';

const handlers = {};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    console.error('handler not found!!');
    return false;
  }
  return handlers[packetType].handler;
};
