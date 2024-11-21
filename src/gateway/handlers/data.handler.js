import { serializerToServer } from '../utils/request/requestToServer.js';
import { C2S_RoutePacket } from '../routes/packet.route.js';

export const handleRequestData = (socket, packetType, payloadBuffer) => {
  try {
    const routeBuffer = serializerToServer(
      packetType,
      socket.remoteAddress,
      socket.remotePort,
      payloadBuffer,
    );
    console.log(routeBuffer);

    C2S_RoutePacket(packetType, routeBuffer);
  } catch (e) {}
};
