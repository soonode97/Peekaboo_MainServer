import { config } from '@peekaboo-ssr/config';
// import { getProtoMessages } from '../../init/load.protos.js';

// 이건 Services를 위한 패킷을 만드는 함수
export const createPacketForServices = (
  packetType,
  address,
  port,
  payloadBuffer,
) => {
  const packetTypeBuffer = Buffer.alloc(2);
  packetTypeBuffer.writeUInt16BE(packetType);
  const addressLengthBuffer = Buffer.alloc(1);
  addressLengthBuffer.writeUInt8(address.length);
  const addressBuffer = Buffer.from(address);
  const portBuffer = Buffer.alloc(1);
  portBuffer.writeUInt8(port);

  return Buffer.concat([
    packetTypeBuffer,
    addressLengthBuffer,
    addressBuffer,
    portBuffer,
    payloadBuffer,
  ]);
};

// 이건 Client를 위한 패킷을 만드는 함수
// export const createPacketForClient = (
//   packetType,
//   payloadData = {},
//   sequence,
// ) => {
//   const typeBuffer = Buffer.alloc(config.packet.typeLength);
//   typeBuffer.writeUInt16BE(packetType);

//   const versionLengthBuffer = Buffer.alloc(config.packet.versionLength);
//   versionLengthBuffer.writeUint8(config.client.clientVersion.length);

//   const versionString = config.client.clientVersion;
//   const versionBuffer = Buffer.from(versionString, 'utf-8');

//   const sequenceBuffer = Buffer.alloc(config.packet.sequenceLength);
//   sequenceBuffer.writeUInt32BE(sequence);

//   const protoMessages = getProtoMessages();
//   const gamePacket = protoMessages.common.GamePacket;
//   const responsePayload = {};
//   responsePayload[PACKET_MAPS[packetType]] = payloadData;
//   const payloadBuffer = gamePacket.encode(responsePayload).finish();

//   const payloadLengthBuffer = Buffer.alloc(config.packet.payloadLength);
//   payloadLengthBuffer.writeUInt32BE(payloadBuffer.length);

//   return Buffer.concat([
//     typeBuffer,
//     versionLengthBuffer,
//     versionBuffer,
//     sequenceBuffer,
//     payloadLengthBuffer,
//     payloadBuffer,
//   ]);
// };
