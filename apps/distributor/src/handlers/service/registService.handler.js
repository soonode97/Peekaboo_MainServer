import { sendInfo } from '../../notifications/connection.notification.js';
import { serviceMap } from '../../data/connection.data.js';

export const registServiceHandler = (socket, payload) => {
  const key = socket.remoteAddress + ':' + socket.remotePort;
  serviceMap[key] = {
    socket: socket,
  };
  serviceMap[key].info = payload;
  sendInfo();
};
