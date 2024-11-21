import { SERVICES_PACKET_TYPE } from '../../constants/header.js';
import { pingHandler } from './service/ping.handler.js';
import { registServiceHandler } from './service/registService.handler.js';

const handlers = {
  [SERVICES_PACKET_TYPE.RegistServiceRequest]: {
    handler: registServiceHandler,
  },
  [SERVICES_PACKET_TYPE.PingRes]: {
    handler: pingHandler,
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    return false;
  }

  return handlers[packetType].handler;
};
