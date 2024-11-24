// 마이크로서비스로부터 데이터를 수신하면 호출
import { config } from '../../config/config.js';
import { getHandlerByPacketType } from '../../distributor/handlers/index.js';

// TcpServer 인스턴스의 서버가 Data를 받았을 때 처리하는 부분
export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  while (socket.buffer.length >= config.packet.typeLength) {
    let offset = 0;
    const packetType = socket.buffer.readUint16BE(offset);
    offset += config.packet.typeLength;

    const payloadLength = socket.buffer.readUint32BE(offset);
    offset += config.packet.payloadLength;

    const totalPacketLength = offset + payloadLength;

    if (socket.buffer.length < totalPacketLength) {
      break;
    }
    const payload = socket.buffer
      .subarray(offset, offset + payloadLength + 8)
      .toString('utf-8');

    socket.buffer = socket.buffer.subarray(totalPacketLength);

    try {
      const payloadObj = JSON.parse(payload);

      const handler = getHandlerByPacketType(packetType);

      await handler(socket, payloadObj);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
};
