import { CLIENTS_HEADER } from '../../../modules/constants/header.js';
import { CLIENT_PACKET_MAPS } from '../../../modules/constants/packet/client.packet.js';
import { SERVICE_PACKET_MAPS } from '../../../modules/constants/packet/service.packet.js';
import { getProtoMessages } from '../../../modules/protobufs/load.protos.js';
import config from '../../config/shared/index.js';

// Distributor => 서비스 / 서비스 => Distributor 패킷을 생성하는 함수
// MSA 서비스 간 패킷을 생성하는 함수로 통일
export const createPacketS2S = (
  packetType,
  sender,
  receiver,
  payloadData = {},
) => {
  // 1. packetType 작성
  const packetTypeBuffer = Buffer.alloc(config.header.service.typeLength);
  packetTypeBuffer.writeUInt16BE(packetType);

  // 2. 보내는 서비스 길이 1 byte
  const senderLengthBuffer = Buffer.alloc(config.header.service.senderLength);
  senderLengthBuffer.writeUInt8(sender.length);

  // 3. 보내는 서비스 bytes
  const senderBuffer = Buffer.from(sender, 'utf-8');

  // 4. 받는 서비스 길이 1 byte
  const receiverLengthBuffer = Buffer.alloc(
    config.header.service.receiverLength,
  );
  receiverLengthBuffer.writeUint8(receiver.length);

  // 5. 받는 서비스 bytes
  const receiverBuffer = Buffer.from(receiver, 'utf-8');

  // 7. 페이로드 bytes
  const protoMessages = getProtoMessages();
  const packet = protoMessages.common.ServicePacket;
  const oneOfPayloadData = {};
  oneOfPayloadData[SERVICE_PACKET_MAPS[packetType]] = payloadData;
  let payloadBuffer;
  try {
    payloadBuffer = packet.encode(oneOfPayloadData).finish();
  } catch (e) {
    console.error(e);
  }

  // 6. 페이로드 길이 4 byte
  const payloadLengthBuffer = Buffer.alloc(config.header.service.payloadLength);
  payloadLengthBuffer.writeUInt32BE(payloadBuffer.length);

  return Buffer.concat([
    packetTypeBuffer,
    senderLengthBuffer,
    senderBuffer,
    receiverLengthBuffer,
    receiverBuffer,
    payloadLengthBuffer,
    payloadBuffer,
  ]);
};

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
