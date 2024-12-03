import config from '@peekaboo-ssr/config/gateway';
import BaseEvent from '@peekaboo-ssr/events/BaseEvent';
import { routeG2SHandler } from '../utils/routes/packet.routes.js';
import { connectSessions } from '../sessions/sessions.js';

class C2GEventHandler extends BaseEvent {
  onConnection(socket) {
    console.log(
      `Game Client connected from: ${socket.remoteAddress}:${socket.remotePort}`,
    );
    connectSessions.push({
      clientKey: `${socket.remoteAddress}:${socket.remotePort}`,
      socket: socket,
      sequence: 1,
    });
    socket.buffer = Buffer.alloc(0);
  }

  // 게이트웨이에서는 헤더 검증 및 라우팅까지만 수행.
  // 라우팅 시 어떤 유저가 보낸건지 저장하여 수행하도록 함.
  onData(socket, data, server = null) {
    socket.buffer = Buffer.concat([socket.buffer, data]);

    while (
      socket.buffer.length >=
      config.header.client.typeLength + config.header.client.versionLength
    ) {
      let offset = 0;
      const packetType = socket.buffer.readUint16BE(offset);
      offset += config.header.client.typeLength;

      const versionLength = socket.buffer.readUint8(offset);
      offset += config.header.client.versionLength;

      const totalHeaderLength =
        config.header.client.typeLength +
        config.header.client.versionLength +
        versionLength +
        config.header.client.sequenceLength +
        config.header.client.payloadLength;

      if (socket.buffer.length < totalHeaderLength) {
        break;
      }

      const version = socket.buffer
        .subarray(offset, offset + versionLength)
        .toString('utf-8');
      offset += versionLength;

      if (version !== config.version) {
        console.error(`버전 에러: ${version}`);
      }

      const sequence = socket.buffer.readUint32BE(offset);
      offset += config.header.client.sequenceLength;

      const payloadLength = socket.buffer.readUint32BE(offset);
      offset += config.header.client.payloadLength;

      const totalPacketLength = totalHeaderLength + payloadLength;
      if (socket.buffer.length < totalPacketLength) {
        break;
      } else {
        const payloadBuffer = socket.buffer.subarray(
          offset,
          offset + payloadLength,
        );
        offset += payloadLength;
        try {
          socket.buffer = socket.buffer.subarray(offset);
          routeG2SHandler(socket, packetType, payloadLength, payloadBuffer);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  onEnd(socket) {
    console.log('Client Disconnected', socket.remoteAddress, socket.remotePort);
  }

  onError(socket, err) {
    console.log('Client Disconnected', socket.remoteAddress, socket.remotePort);
  }
}

export default C2GEventHandler;
