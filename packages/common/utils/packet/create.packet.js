import { CLIENTS_HEADER, ROUTES_HEADER } from '../../constants/header.js';

// 서비스에서 Distributor를 위한 패킷을 만드는 함수
export const createPacketS2D = (packetType, payload) => {
  const strPayload = JSON.stringify(payload);

  const payloadLength = Buffer.byteLength(strPayload);
  const buffer = Buffer.alloc(
    CLIENTS_HEADER.PACKET_TYPE_LENGTH +
      CLIENTS_HEADER.PAYLOAD_LENGTH +
      payloadLength,
  );
  let offset = 0;
  // packetType 작성
  buffer.writeUInt16BE(packetType, offset);
  offset += CLIENTS_HEADER.PACKET_TYPE_LENGTH;

  // payloadLength 작성
  buffer.writeUInt32BE(payloadLength, offset);
  offset += CLIENTS_HEADER.PAYLOAD_LENGTH;

  // payload 작성
  buffer.write(strPayload, offset);

  return buffer;
};

// 서비스에서 서비스를 위한 패킷을 만드는 함수
export const createPacketS2S = () => {};

// 게이트에서 서비스를 위한 패킷을 만드는 함수
export const createPacketG2S = (
  packetType,
  clientKey,
  payloadLength,
  payloadBuffer,
) => {
  console.log('0000000000000 서비스를 위한 패킷만들기');
  // 얘 왜 못하는건데 쓰바
  const packetTypeBuffer = Buffer.alloc(CLIENTS_HEADER.PACKET_TYPE_LENGTH);
  packetTypeBuffer.writeUInt16BE(packetType);

  const clientKeyLengthBuffer = Buffer.alloc(CLIENTS_HEADER.CLIENT_KEY_LENGTH);
  clientKeyLengthBuffer.writeUInt8(clientKey.length);

  const clientKeyBuffer = Buffer.from(clientKey);

  const payloadLengthBuffer = Buffer.alloc(CLIENTS_HEADER.PAYLOAD_LENGTH);
  payloadLengthBuffer.writeUInt32BE(payloadLength);

  return Buffer.concat([
    packetTypeBuffer,
    clientKeyLengthBuffer,
    clientKeyBuffer,
    payloadLengthBuffer,
    payloadBuffer,
  ]);
};

// 게이트에서 Client를 위한 패킷을 만드는 함수
export const createPacketG2C = (packetType, payloadData = {}, sequence) => {
  const typeBuffer = Buffer.alloc(config.packet.typeLength);
  typeBuffer.writeUInt16BE(packetType);

  const versionLengthBuffer = Buffer.alloc(config.packet.versionLength);
  versionLengthBuffer.writeUint8(CLIENTS_HEADER.clientVersion.length);

  const versionString = CLIENTS_HEADER.clientVersion;
  const versionBuffer = Buffer.from(versionString, 'utf-8');

  const sequenceBuffer = Buffer.alloc(config.packet.sequenceLength);
  sequenceBuffer.writeUInt32BE(sequence);

  // const protoMessages = getProtoMessages();
  // const gamePacket = protoMessages.common.GamePacket;
  // const responsePayload = {};
  // responsePayload[PACKET_MAPS[packetType]] = payloadData;
  // const payloadBuffer = gamePacket.encode(responsePayload).finish();

  const payloadLengthBuffer = Buffer.alloc(config.packet.payloadLength);
  payloadLengthBuffer.writeUInt32BE(payloadBuffer.length);

  return Buffer.concat([
    typeBuffer,
    versionLengthBuffer,
    versionBuffer,
    sequenceBuffer,
    payloadLengthBuffer,
    payloadBuffer,
  ]);
};
