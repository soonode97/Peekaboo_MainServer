// proto 파일들을 불러와서 할 수 있도록 할 예정.

import { getProtoMessages } from '../../protobufs/load.protos.js';

// Distributor에서 서비스에게 보낸 페이로드에 대해 파싱하기 위한 함수
export const parsePacketD2S = () => {};

// 서비스에서 서비스에게 보낸 페이로드에 대해 파싱하기 위한 함수
export const parsePacketS2S = () => {};

// 클라이언트에서 게이트로 보낸 페이로드에 대해 파싱하기 위한 함수
// 페이로드를 바로 라우팅해서 보내기때문에 필요없음.
// export const parsePacketC2G = () => {};

// 게이트에서 서비스로 보낸 페이로드에 대해 파싱하기 위한 함수
export const parsePacketG2S = (payloadBuffer) => {
  console.log('받은 버퍼: ', payloadBuffer);
  const protoMessages = getProtoMessages();
  // console.log(protoMessages);

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
      return {
        payload: payloadData[key],
      };
    }
  }
};
