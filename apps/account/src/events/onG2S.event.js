import config from '@peekaboo-ssr/config/lobby';
import BaseEvent from '@peekaboo-ssr/events/BaseEvent';
import { getHandlerByPacketType } from '../handlers.js';

class G2SEventHandler extends BaseEvent {
  onConnection(socket) {
    console.log(
      `Gate connected from: ${socket.remoteAddress}:${socket.remotePort}`,
    );
    socket.buffer = Buffer.alloc(0);
  }

  async onData(socket, data) {
    console.log('Service가 게이트로부터 데이터를 받음..', data);
    socket.buffer = Buffer.concat([socket.buffer, data]);

    while (socket.buffer.length >= config.header.client.typeLength) {
      let offset = 0;
      const packetType = socket.buffer.readUint16BE(offset);
      offset += config.header.client.typeLength;

      const clientKeyLength = socket.buffer.readUInt8(offset);
      offset += config.header.client.clientKeyLength;

      const clientKey = socket.buffer.subarray(
        offset,
        offset + clientKeyLength,
      );
      offset += clientKeyLength;

      const payloadLength = socket.buffer.readUint32BE(offset);
      offset += config.header.service.payloadLength;

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
        console.log(payloadObj);

        const handler = getHandlerByPacketType(packetType);

        await handler(socket, payloadObj, clientKey);
      } catch (e) {
        console.error(e);
      }
    }
  }

  onEnd(socket) {
    console.log('onClose', socket.remoteAddress, socket.remotePort);
  }

  onError(socket, err) {
    console.log('onClose', socket.remoteAddress, socket.remotePort);
  }
}

export default G2SEventHandler;
