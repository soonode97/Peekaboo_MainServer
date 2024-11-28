import { CLIENTS_HEADER } from '../../../modules/constants/header.js';
import { CLIENT_PACKET_MAPS } from '../../../modules/constants/packet.js';
import { getProtoMessages } from '../../../modules/protobufs/load.protos.js';
import config from '../../config/shared/index.js';

// Distributor => 서비스 / 서비스 => Distributor 패킷을 생성하는 함수
// MSA 서비스 간 패킷을 생성하는 함수로 통일
export const createPacketS2S = (packetType, payload) => {
  /**
   * 서비스 간 패킷 구조
   *
   * 음................................................................ .. . .. . . .....
   * ...... . . . . . .......... . . . .
   *
   * 1. 패킷 타입
   * 2. 보내는 서비스
   * 3. 받는 서비스
   * 4. 페이로드 길이
   * 5. 페이로드
   *
   * 보내고 받는 서비스는 길이 유동적으로 안하고 고정하는 방향.. 10자 이내 / 서비스 이름이 길지 않도록 제한 하면 좋을듯
   * 오키 끝!
   */

  // payload(JSON)을 일단 문자열로 변환
  const strPayload = JSON.stringify(payload);

  // 2. 보내는 서비스
  const payloadLength = Buffer.byteLength(strPayload);
  const buffer = Buffer.alloc(
    CLIENTS_HEADER.PACKET_TYPE_LENGTH +
      CLIENTS_HEADER.PAYLOAD_LENGTH +
      payloadLength,
  );
  let offset = 0;
  // 1. packetType 작성
  buffer.writeUInt16BE(packetType, offset);
  offset += CLIENTS_HEADER.PACKET_TYPE_LENGTH;

  // payloadLength 작성
  buffer.writeUInt32BE(payloadLength, offset);
  offset += CLIENTS_HEADER.PAYLOAD_LENGTH;

  // payload 작성
  buffer.write(strPayload, offset);

  return buffer;
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
