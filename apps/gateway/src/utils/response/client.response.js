import { createPacketG2C } from '@peekaboo-ssr/utils';

// 클라이언트에 패킷을 보내주는 함수
export const sendPacketToClient = (packetType, client, payloadBuffer) => {
  const packet = createPacketG2C(packetType, payloadBuffer, client.sequence);

  console.log('보낼 버퍼: ', packet);
  client.write(packet);
};
