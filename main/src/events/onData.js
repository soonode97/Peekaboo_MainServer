import proxy from '../classes/managers/proxyManager.js';
import { config } from '../config/config.js';
import { getHandlerByPacketType } from '../handlers/index.js';
import parserPacket from '../utils/packet/parser.packet.js';

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

      // 걸러져서 실행
      proxy.sendProxyServerToPacket(packetType, payloadBuffer);
    }
  }
};

// 메인에서 보낼 때 페이로드 전까지 검증하고 줘야할거같은데..
// 로비에서는 모두 검증할 필요없이 패킷타입과 페이로드만 확인하고 응답
// 근데 문제는 소켓 구분이 되는가?..
// 메인에서 로비로부터 받아온 데이터를 소켓 구분이되어 보내줘야하는데
// 로비에서 메인한테 보낼 때 소켓을 붙혀서 줘야하나 고민
