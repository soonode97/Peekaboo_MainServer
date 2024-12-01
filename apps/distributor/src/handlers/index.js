import config from '@peekaboo-ssr/config/distributor';
import { registServiceHandler } from './service/registService.handler.js';
import { joinUserHandler } from './session/session.handler.js';

const handlers = {
  [config.servicePacket.CreateServiceRequest]: {
    handler: registServiceHandler,
  },
  [config.servicePacket.joinUserHandler]: {
    handler: joinUserHandler,
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    console.error('Distributor에서 핸들러를 찾을 수 없음!');
    return false;
  }
  console.log('Distributor 핸들러 찾음!');
  console.log(handlers[packetType].handler);
  return handlers[packetType].handler;
};
