import { CLIENTS_HEADER } from '../../constants/header.js';
import { CLIENT_PACKET_MAPS } from '../../constants/packet.js';
import { getProtoMessages } from '../../protobufs/load.protos.js';
import config from '../../config/shared/index.js';

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
  const packetTypeBuffer = Buffer.alloc(CLIENTS_HEADER.PACKET_TYPE_LENGTH);
  packetTypeBuffer.writeUInt16BE(packetType);

  const clientKeyLengthBuffer = Buffer.alloc(CLIENTS_HEADER.CLIENT_KEY_LENGTH);
  clientKeyLengthBuffer.writeUInt8(clientKey.length);

  const clientKeyBuffer = Buffer.from(clientKey, 'utf-8');

  const payloadLengthBuffer = Buffer.alloc(CLIENTS_HEADER.PAYLOAD_LENGTH);
  payloadLengthBuffer.writeUInt32BE(payloadLength);
  console.log('payloadLength: ', payloadLength);

  return Buffer.concat([
    packetTypeBuffer,
    clientKeyLengthBuffer,
    clientKeyBuffer,
    payloadLengthBuffer,
    payloadBuffer,
  ]);
};

// 서비스에서 게이트를 위한 패킷을 만드는 함수
export const createPacketS2G = (packetType, clientKey, payloadData = {}) => {
  const packetTypeBuffer = Buffer.alloc(CLIENTS_HEADER.PACKET_TYPE_LENGTH);
  packetTypeBuffer.writeUInt16BE(packetType);

  const clientKeyLengthBuffer = Buffer.alloc(CLIENTS_HEADER.CLIENT_KEY_LENGTH);
  clientKeyLengthBuffer.writeUInt8(clientKey.length);

  const clientKeyBuffer = Buffer.from(clientKey);

  const payloadLengthBuffer = Buffer.alloc(CLIENTS_HEADER.PAYLOAD_LENGTH);

  const protoMessages = getProtoMessages();

  const packet = protoMessages.common.GamePacket;

  const oneOfPayloadData = {};
  oneOfPayloadData[CLIENT_PACKET_MAPS[packetType]] = payloadData;

  let payloadBuffer;
  try {
    payloadBuffer = packet.encode(oneOfPayloadData).finish();
  } catch (e) {
    console.error(e);
  }

  payloadLengthBuffer.writeUInt32BE(payloadBuffer.length);

  return Buffer.concat([
    packetTypeBuffer,
    clientKeyLengthBuffer,
    clientKeyBuffer,
    payloadLengthBuffer,
    payloadBuffer,
  ]);
};

// 게이트에서 Client를 위한 패킷을 만드는 함수
export const createPacketG2C = (packetType, payloadBuffer, sequence) => {
  const typeBuffer = Buffer.alloc(CLIENTS_HEADER.PACKET_TYPE_LENGTH);
  typeBuffer.writeUInt16BE(packetType);

  const versionLengthBuffer = Buffer.alloc(CLIENTS_HEADER.VERSION_LENGTH);
  versionLengthBuffer.writeUint8(config.version.length);

  const versionString = config.version;
  const versionBuffer = Buffer.from(versionString, 'utf-8');

  const sequenceBuffer = Buffer.alloc(CLIENTS_HEADER.SEQUENCE_LENGTH);
  sequenceBuffer.writeUInt32BE(sequence++);

  const payloadLengthBuffer = Buffer.alloc(CLIENTS_HEADER.PAYLOAD_LENGTH);
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
