import { serviceMap } from '../data/connection.data.js';
import { createPacketS2S } from '@peekaboo-ssr/utils/createPacket';

export const sendInfo = (socket) => {
  // createPacketS2S 용 정의가 필요하고 사용해서 패킷 보낼 수 있도록 해야 함.
  const packet = {
    microservices: [],
  };

  for (let i in serviceMap) {
    packet.microservices.push(serviceMap[i].info);
  }
  // 소켓이 있는 경우 자신에게도 정보를 보냄
  if (socket) {
    socket.write(JSON.stringify(packet));
  } else {
    // 다른 마이크로서비스에게도 자신의 정보를 보냄
    for (let j in serviceMap) {
      serviceMap[j].socket.write(JSON.stringify(packet));
    }
  }
};
