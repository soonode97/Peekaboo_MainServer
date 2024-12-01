import { SERVICE_PACKET } from '../constants/packet/service.packet.js';
import { createServiceNotificationHandler } from './service/createService.handler.js';

export const handlers = {
  [SERVICE_PACKET.CreatedServiceNotification]: {
    handler: createServiceNotificationHandler,
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType].handler) {
    console.error('******해당 핸들러를 찾을 수 없습니다');
    return null;
  }
  return handlers[packetType].handler;
};
