import { serviceMap } from '../../distributor/connections/connection.js';
import { sendInfo } from '../../distributor/notifications/service.notification.js';

export const onError = (socket) => async () => {
  const key = socket.remoteAddress + ':' + socket.remotePort;
  console.log('onClose', socket.remoteAddress, socket.remotePort);
  delete serviceMap[key];
  sendInfo();
};
