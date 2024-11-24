import { config } from '@peekaboo-ssr/config';
import { getHandlerByPacketType } from '../handlers/index.js';
import BaseHandler from '@peekaboo-ssr/handler/BaseHandler';
import { sendInfo } from '../notifications/service.notification.js';
import { serviceMap } from '../connections/connection.js';

class DistributorHandler extends BaseHandler {
  onConnection(socket) {
    console.log(
      `Client connected from: ${socket.remoteAddress}:${socket.remotePort}`,
    );
    sendInfo(socket);
    socket.buffer = Buffer.alloc(0);
  }

  async onData(socket, data) {
    console.log('Distributor가 데이터를 받음..');
    socket.buffer = Buffer.concat([socket.buffer, data]);

    while (socket.buffer.length >= config.packetHeader.typeLength) {
      let offset = 0;
      const packetType = socket.buffer.readUint16BE(offset);
      offset += config.packetHeader.typeLength;

      const payloadLength = socket.buffer.readUint32BE(offset);
      offset += config.packetHeader.payloadLength;

      const totalPacketLength = offset + payloadLength;

      if (socket.buffer.length < totalPacketLength) {
        break;
      }
      const payload = socket.buffer
        .subarray(offset, offset + payloadLength)
        .toString('utf-8');

      socket.buffer = socket.buffer.subarray(totalPacketLength);

      try {
        const payloadObj = JSON.parse(payload);

        console.log(packetType);

        const handler = getHandlerByPacketType(packetType);

        await handler(socket, payloadObj);
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    }
  }

  onEnd(socket) {
    const key = socket.remoteAddress + ':' + socket.remotePort;
    console.log('onClose', socket.remoteAddress, socket.remotePort);
    delete serviceMap[key];
    sendInfo();
  }

  onError(socket, err) {
    const key = socket.remoteAddress + ':' + socket.remotePort;
    console.log('onClose', socket.remoteAddress, socket.remotePort);
    delete serviceMap[key];
    sendInfo();
  }
}

export default DistributorHandler;
