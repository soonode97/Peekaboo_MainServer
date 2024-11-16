import { config } from '../../config/config.js';
import { PACKET_MAPS } from '../../constants/packet.js';
import { getProtoMessages } from '../../init/load.protos.js';

export const serializer = (packetType, payloadData = {}, sequence) => {
  const typeBuffer = Buffer.alloc(config.packet.typeLength);
  typeBuffer.writeUInt16BE(packetType);

  const versionLengthBuffer = Buffer.alloc(config.packet.versionLength);
  versionLengthBuffer.writeUint8(config.client.clientVersion.length);

  const versionString = config.client.clientVersion;
  const versionBuffer = Buffer.from(versionString, 'utf-8');

  const sequenceBuffer = Buffer.alloc(config.packet.sequenceLength);
  sequenceBuffer.writeUInt32BE(sequence);

  const protoMessages = getProtoMessages();
  const gamePacket = protoMessages.common.GamePacket;
  const responsePayload = {};
  responsePayload[PACKET_MAPS[packetType]] = payloadData;
  const payloadBuffer = gamePacket.encode(responsePayload).finish();

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
