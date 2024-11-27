import config from '@peekaboo-ssr/config/account';
import { createPacketS2G } from '@peekaboo-ssr/utils';

export const loginRequestHandler = (socket, clientKey, payload) => {
  console.log('loginRequestHandler............');

  // ID / PASSWORD 검증

  // DB 검증

  // JWT 토큰 발급

  // UUID 발급

  // globalFailCode, userId, token 을 payload로 만듦

  // 임시 응답값
  const payloadData = {
    globalFailCode: 0,
    userId: 'uuid',
    token: 'token',
  };
  const packet = createPacketS2G(
    config.clientPacket.account.LoginResponse,
    clientKey,
    payloadData,
  );
  socket.write(packet);
};
