import { sendInfo } from '../../notifications/connection.notification.js';
import { serviceMap } from '../../source/connection.source.js';

/**
 * 연결된 서비스를 serviceMap에 등록하는 함수입니다.
 */
export const connectServiceHandler = async (socket, payload) => {
  const key = socket.remoteAddress + ':' + socket.remotePort;
  serviceMap[key] = {
    socket: socket,
  };
  serviceMap[key].info = payload;
  sendInfo();
};
