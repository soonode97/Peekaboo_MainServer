import { serviceMap } from '../data/connection.data.js';

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
    socket.write(JSON.stringify(packet));
  } else {
    // 다른 마이크로서비스에게도 자신의 정보를 보냄
    for (let j in serviceMap) {
      serviceMap[j].socket.write(JSON.stringify(packet));
    }
  }
};
