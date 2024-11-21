import { onData } from './onData.event.js';
import { onEnd } from './onEnd.event.js';
import { onError } from './onError.event.js';
import {
  sendInfo,
  sendPing,
} from '../../distributor/notifications/service.notification.js';

const onConnection = (socket) => {
  console.log(
    `Client connected from: ${socket.remoteAddress}:${socket.remotePort}`,
  );
  sendInfo(socket);
  socket.buffer = Buffer.alloc(0);
  setInterval(sendPing, 2000);

  socket.on('data', onData(socket));
  socket.on('end', onEnd(socket));
  socket.on('error', onError(socket));
};

export default onConnection;
