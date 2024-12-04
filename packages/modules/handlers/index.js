import servicePacket from '@peekaboo-ssr/modules-constants/servicePacket';
import { connectedServiceNotificationHandler } from '@peekaboo-ssr/modules-handlers/connection';

export const handlers = {
  [servicePacket.ConnectedServiceNotification]: {
    handler: connectedServiceNotificationHandler,
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType].handler) {
    console.error('******해당 핸들러를 찾을 수 없습니다');
    return null;
  }
  return handlers[packetType].handler;
};
