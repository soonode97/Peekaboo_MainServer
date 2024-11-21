import { sendInfo } from '../../notifications/service.notification.js';
import { serviceMap } from '../../connections/connection.js';

export const registServiceHandler = (socket, payload) => {
  const key = socket.remoteAddress + ':' + socket.remotePort;
  serviceMap[key] = {
    socket: socket,
  };
  serviceMap[key].info = payload;
  sendInfo();
};
