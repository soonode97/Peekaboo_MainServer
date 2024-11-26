import config from '@peekaboo-ssr/config/gateway';
import BaseEvent from './base.events.js';

class C2GEventHandler extends BaseEvent {
  onConnection(socket) {
    console.log(
      `Client connected from: ${socket.remoteAddress}:${socket.remotePort}`,
    );
    socket.buffer = Buffer.alloc(0);
  }

  // 게이트웨이에서는 헤더 검증 및 라우팅까지만 수행.
  // 라우팅 시 어떤 유저가 보낸건지 저장하여 수행하도록 함.
  async onData(socket, data) {
    socket.buffer = Buffer.concat([socket.buffer, data]);

    while (
      socket.buffer.length >=
      config.clientHeader.PACKET_TYPE_LENGTH +
        config.clientHeader.VERSION_LENGTH
    ) {
      let offset = 0;
      const packetType = socket.buffer.readUint16BE(offset);
      offset += config.clientHeader.PACKET_TYPE_LENGTH;

      const versionLength = socket.buffer.readUint8(offset);
      offset += config.clientHeader.VERSION_LENGTH;

      const totalHeaderLength =
        config.clientHeader.PACKET_TYPE_LENGTH +
        config.clientHeader.VERSION_LENGTH +
        versionLength +
        config.clientHeader.SEQUENCE_LENGTH +
        config.clientHeader.PAYLOAD_LENGTH;

      if (socket.buffer.length < totalHeaderLength) {
        break;
      }

      const version = socket.buffer
        .subarray(offset, offset + versionLength)
        .toString('utf-8');
      offset += versionLength;

      if (version !== config.client.clientVersion) {
        console.error(`버전 에러: ${version}`);
      }

      const sequence = socket.buffer.readUint32BE(offset);
      offset += config.clientHeader.SEQUENCE_LENGTH;

      const payloadLength = socket.buffer.readUint32BE(offset);
      offset += config.clientHeader.PAYLOAD_LENGTH;

      const totalPacketLength = totalHeaderLength + payloadLength;
      if (socket.buffer.length < totalPacketLength) {
        break;
      } else {
        const payloadBuffer = socket.buffer.subarray(
          offset,
          offset + payloadLength,
        );
        offset += payloadLength;

        handleRequestData(socket, packetType, payloadBuffer);
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
