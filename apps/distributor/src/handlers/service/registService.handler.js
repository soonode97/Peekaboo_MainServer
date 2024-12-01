import { sendInfo } from '../../notifications/connection.notification.js';
import { serviceMap } from '../../source/connection.source.js';

export const connectServiceHandler = async (socket, payload) => {
  const key = socket.remoteAddress + ':' + socket.remotePort;
  serviceMap[key] = {
    socket: socket,
  };
  serviceMap[key].info = payload;
  sendInfo();
};
