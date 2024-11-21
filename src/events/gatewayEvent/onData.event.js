import { config } from '../../config/config.js';
import { handleRequestData } from '../../gateway/handlers/data.handler.js';

// 게이트웨이에서는 헤더 검증 및 라우팅까지만 수행.
// 라우팅 시 어떤 유저가 보낸건지 저장하여 수행하도록 함.

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  while (
    socket.buffer.length >=
    config.packet.typeLength + config.packet.versionLength
  ) {
    let offset = 0;
    const packetType = socket.buffer.readUint16BE(offset);
    offset += config.packet.typeLength;

    const versionLength = socket.buffer.readUint8(offset);
    offset += config.packet.versionLength;

    const totalHeaderLength =
      config.packet.typeLength +
      config.packet.versionLength +
      versionLength +
      config.packet.sequenceLength +
      config.packet.payloadLength;

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
    offset += config.packet.sequenceLength;

    const payloadLength = socket.buffer.readUint32BE(offset);
    offset += config.packet.payloadLength;

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
};
