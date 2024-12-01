import config from '@peekaboo-ssr/config/distributor';
import { connectServiceHandler } from './service/registService.handler.js';

const handlers = {
  [config.servicePacket.ConnectServiceRequest]: {
    handler: connectServiceHandler,
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    console.error('Distributor에서 핸들러를 찾을 수 없음!');
    return false;
  }
  return handlers[packetType].handler;
};
