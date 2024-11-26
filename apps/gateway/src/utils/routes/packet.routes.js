import { createPacketG2S } from '@peekaboo-ssr/utils';
import { findRouterService } from './find.routes.js';

export const routeG2SHandler = (
  socket,
  packetType,
  payloadLength,
  payloadBuffer,
) => {
  try {
    console.log('----------- 게이트가 클라이언트로 데이터 받음 -----------');
    console.log(packetType, payloadLength, payloadBuffer);
    const clientKey = socket.remoteAddress + ':' + socket.remotePort;
    const routeBuffer = createPacketG2S(
      packetType,
      clientKey,
      payloadLength,
      payloadBuffer,
    );
    console.log(routeBuffer);
    const routingClient = findRouterService(packetType);

    console.log(routingClient);

    routingClient.write(routeBuffer);
  } catch (e) {
    console.error(e);
  }
};
