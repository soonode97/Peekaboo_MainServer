import { config } from '../../../config/config.js';

export const createPacketForDistributor = (packetType, payload) => {
  const strPayload = JSON.stringify(payload);

  const payloadLength = Buffer.byteLength(strPayload);
  const buffer = Buffer.alloc(
    config.packet.typeLength + config.packet.payloadLength + payloadLength,
  );
  let offset = 0;
  // packetType 작성
  buffer.writeUInt16BE(packetType, offset);
  offset += config.packet.typeLength;

  // payloadLength 작성
  buffer.writeUInt32BE(payloadLength, offset);
  offset += config.packet.payloadLength;

  // payload 작성
  buffer.write(strPayload, offset);

  console.log(`갓 만든 버퍼:`, buffer);
  return buffer;
};
