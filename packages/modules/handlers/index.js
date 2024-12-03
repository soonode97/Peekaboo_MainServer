import { SERVICE_PACKET } from '../constants/packet/service.packet.js';
import { connectedServiceNotificationHandler } from './connection/connectService.handler.js';
import { joinSessionHandler } from './session/joinSession.handler.js';
import { exitSessionHandler } from './session/exitSession.handler.js';

export const handlers = {
  [SERVICE_PACKET.ConnectedServiceNotification]: {
    handler: connectedServiceNotificationHandler,
  },
  [SERVICE_PACKET.JoinSessionRequest]: {
    handler: joinSessionHandler,
  },
  [SERVICE_PACKET.DisconnectServiceRequest]: {
    handler: exitSessionHandler,
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType].handler) {
    console.error('******해당 핸들러를 찾을 수 없습니다');
    return null;
  }
  return handlers[packetType].handler;
};
