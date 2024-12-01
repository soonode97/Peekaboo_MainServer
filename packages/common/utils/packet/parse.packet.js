// proto 파일들을 불러와서 할 수 있도록 할 예정.

import { getProtoMessages } from '../../../modules/protobufs/load.protos.js';

// 서비스가 보낸 페이로드에 대해 파싱하기 위한 함수
export const parsePacketS2S = (payloadBuffer) => {
  console.log('받은 버퍼: ', payloadBuffer);
  const protoMessages = getProtoMessages();
  const packet = protoMessages.common.ServicePacket;

  let payloadData;
  try {
    payloadData = packet.decode(payloadBuffer);
  } catch (e) {
    console.error(e);
  }

  for (const key in payloadData) {
    if (
      payloadData.hasOwnProperty(key) &&
      typeof payloadData[key] === 'object'
    ) {
      return payloadData[key];
    }
  }
};

// 게임 클라이언트가 보낸 페이로드에 대해 파싱하기 위한 함수
export const parsePacketG2S = (payloadBuffer) => {
  console.log('받은 버퍼: ', payloadBuffer);
  const protoMessages = getProtoMessages();

  console.log('--------000--------');
  const packet = protoMessages.common.GamePacket;

  let payloadData;
  try {
    payloadData = packet.decode(payloadBuffer);
  } catch (e) {
    console.error(e);
  }

  for (const key in payloadData) {
    if (
      payloadData.hasOwnProperty(key) &&
      typeof payloadData[key] === 'object'
    ) {
      return payloadData[key];
    }
  }
};
