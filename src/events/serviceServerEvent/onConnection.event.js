import { onData } from './onData.event.js';
import { onEnd } from './onEnd.event.js';
import { onError } from './onError.event.js';

const onConnection = (socket) => {
  console.log(
    `Client connected from: ${socket.remoteAddress}:${socket.remotePort}`,
  );
  socket.buffer = Buffer.alloc(0);

  socket.on('data', onData(socket));
  socket.on('end', onEnd(socket));
  socket.on('error', onError(socket));
};

export default onConnection;
