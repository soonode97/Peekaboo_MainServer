import { CLIENT_PACKET } from '../../../modules/constants/packet/client.packet.js';
import { SERVICE_PACKET } from '../../../modules/constants/packet/service.packet.js';

// 소켓에 보낼 에러 응답 값
export const ErrorResponse = {
  [CLIENT_PACKET.account.LoginResponse]: {
    payloadData: {
      globalFailCode: 3,
      userId: 'none',
      token: 'none',
    },
  },
};
