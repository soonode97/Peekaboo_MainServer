import { serviceMap } from '../source/connection.source.js';
import { createPacketS2S } from '@peekaboo-ssr/utils/createPacket';
import config from '@peekaboo-ssr/config/distributor';

export const sendInfo = (socket = null) => {
  const packet = {
    microservices: [],
    message: '',
  };

  for (let i in serviceMap) {
    packet.microservices.push(serviceMap[i].info);
  }

  // 소켓이 있는 경우 자신에게 정보를 보냄
  if (socket && socket !== null) {
    packet.message = '기존 서비스 알림';
    const payload = createPacketS2S(
      config.servicePacket.CreatedServiceNotification,
      'distributor',
      'self', // 아 이거 본인 어떻게 가르키지...
      packet,
    );
    socket.write(payload);
  } else {
    // 아니라면 마이크로서비스에게 자신의 정보를 보냄
    for (let j in serviceMap) {
      packet.message = '서비스 변동 알림';
      const payload = createPacketS2S(
        config.servicePacket.CreatedServiceNotification,
        'distributor',
        serviceMap[j].info.name,
        packet,
      );
      serviceMap[j].socket.write(payload);
    }
  }
};
