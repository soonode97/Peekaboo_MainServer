import { sendInfo } from '../../notifications/connection.notification.js';
import { serviceMap } from '../../source/connection.source.js';

export const registServiceHandler = async (socket, payload) => {
  // 하.. 여기 왜 못타는건데 ........................
  console.log('-------------------------Register', payload);
  const key = socket.remoteAddress + ':' + socket.remotePort;
  serviceMap[key] = {
    socket: socket,
  };
  serviceMap[key].info = payload;

  sendInfo();
};
