import { serviceMap } from '../connections/connection.js';
import { sendPacket } from '../response/packet.response.js';

// 접속한 마이크로서비스들에게 접속 정보를 알리는 메서드
export const sendInfo = (socket) => {
  const packet = {
    uri: '/distributes',
    method: 'GET',
    key: 0,
    microservices: [],
  };

  for (let i in serviceMap) {
    packet.microservices.push(serviceMap[i].info);
  }
  // 소켓이 있는 경우 자신에게도 정보를 보냄
  if (socket) {
    sendPacket(socket, packet);
  } else {
    // 다른 마이크로서비스에게도 자신의 정보를 보냄
    for (let j in serviceMap) {
      sendPacket(serviceMap[j].socket, packet);
    }
  }
};

export const sendPing = (socket) => {
  const packet = { ping: 'ping' };
  for (let i in serviceMap) {
    sendPacket(serviceMap[i].socket, packet);
  }
};
