import { createPacketG2S } from '@peekaboo-ssr/utils/createPacket';
import { findRouterService } from './find.routes.js';

export const routeG2SHandler = (
  socket,
  packetType,
  payloadLength,
  payloadBuffer,
) => {
  try {
    const clientKey = socket.remoteAddress + ':' + socket.remotePort;
    const routeBuffer = createPacketG2S(
      packetType,
      clientKey,
      payloadLength,
      payloadBuffer,
    );
    const routingClient = findRouterService(packetType);
    routingClient.write(routeBuffer);
  } catch (e) {
    console.error(e);
  }
};
