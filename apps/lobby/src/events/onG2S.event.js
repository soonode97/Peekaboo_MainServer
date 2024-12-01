import config from '@peekaboo-ssr/config/lobby';
import BaseEvent from '@peekaboo-ssr/events/BaseEvent';

class G2SEventHandler extends BaseEvent {
  onConnection(socket) {
    console.log(
      `Gate connected from: ${socket.remoteAddress}:${socket.remotePort}`,
    );
    socket.buffer = Buffer.alloc(0);
  }

  async onData(socket, data) {
    socket.buffer = Buffer.concat([socket.buffer, data]);

    while (socket.buffer.length >= config.header.service.typeLength) {
      let offset = 0;
      const packetType = socket.buffer.readUint16BE(offset);
      offset += config.header.service.typeLength;

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
        // 여기 이제 새로운 패킷헤더로 바뀌어야 함.
        const payloadObj = JSON.parse(payload);

        const handler = getHandlerByPacketType(packetType);

        await handler(socket, payloadObj);
      } catch (e) {
        console.error(e);
        process.exit(1);
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
