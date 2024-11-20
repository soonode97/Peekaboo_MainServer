// 요청에 따른 핸들러를 호출하고 실행시키는 파일

import { PACKET_TYPE } from '../../constants/header.js';

// 메인 서버에서 다루어야 할 패킷 처리들
const handlers = {
  [PACKET_TYPE.RegisterUserRequest]: {
    handler: '',
    protoType: '',
  },
  [PACKET_TYPE.LoginUserRequest]: {
    handler: '',
    protoType: '',
  },
  [PACKET_TYPE.EnterLobbyRequest]: {
    handler: '',
    protoType: '',
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    // 에러 발생
  }
  return handlers[packetType].handler;
};
