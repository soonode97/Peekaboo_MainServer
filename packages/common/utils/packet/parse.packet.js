// proto 파일들을 불러와서 할 수 있도록 할 예정.

import { CLIENT_PACKET_MAPS } from '../../../modules/constants/packet/client.packet.js';
import { SERVICE_PACKET_MAPS } from '../../../modules/constants/packet/service.packet.js';
import { getProtoMessages } from '../../../modules/protobufs/load.protos.js';

// 서비스가 보낸 페이로드에 대해 파싱하기 위한 함수
export const parsePacketS2S = (packetType, payloadBuffer) => {
  const protoMessages = getProtoMessages();
  const packet = protoMessages.common.ServicePacket;

  let payloadData;
  try {
    payloadData = packet.decode(payloadBuffer);
  } catch (e) {
    console.error(e);
  }

  return payloadData[SERVICE_PACKET_MAPS[packetType]];
};

// 게임 클라이언트가 보낸 페이로드에 대해 파싱하기 위한 함수
export const parsePacketG2S = (packetType, payloadBuffer) => {
  const protoMessages = getProtoMessages();
  const packet = protoMessages.common.GamePacket;

  let payloadData;
  try {
    payloadData = packet.decode(payloadBuffer);
  } catch (e) {
    console.error(e);
  }

  return payloadData[CLIENT_PACKET_MAPS[packetType]];
};
