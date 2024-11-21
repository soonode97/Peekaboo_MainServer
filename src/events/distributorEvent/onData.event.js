// 마이크로서비스로부터 데이터를 수신하면 호출
// 수신할 데이터의 종류는 distributor에서 정의한 method 중 하나
// POST면 등록일거고, GET이면 특정 마이크로서비스를 가져오는 것
// 왜냐하면 distributor가 모든 마이크로서비스의 위치 정보를 알고있기 때문에 특정 노드에서 정보를 가져오려면 distributor를 거쳐야함.
// 망형이라면 가져오지 않고도 각 서버가 다른 서버에 대한 정보를 저장을 하고 있음.
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

    console.log(`buffer: ${socket.buffer}`);
    console.log(`bufferLength: ${socket.buffer.length}`);
    console.log(`offset: ${offset}`);
    console.log(`totalPacketLength: ${totalPacketLength}`);
    console.log(`payload: ${payload}`);
    console.log('----------------');

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
