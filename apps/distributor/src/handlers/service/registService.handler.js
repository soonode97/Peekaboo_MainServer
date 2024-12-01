import { sendInfo } from '../../notifications/connection.notification.js';
import { serviceMap } from '../../source/connection.source.js';

export const registServiceHandler = (socket, payload) => {
  const key = socket.remoteAddress + ':' + socket.remotePort;
  serviceMap[key] = {
    socket: socket,
  };
  serviceMap[key].info = payload;

  sendInfo(null, '새로운 서비스가 등록되었습니다.');
};
