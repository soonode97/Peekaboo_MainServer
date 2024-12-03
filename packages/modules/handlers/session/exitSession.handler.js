import { createPacketS2S } from '../../../common/utils/packet/create.packet.js';

/**
 * 클라이언트의 연결이 끊길때 세션에서 삭제 해주는 함수입니다.
 */
export const exitSessionHandler = async (server, data) => {
  const { uuid, type } = data;

  //   const session = server.getSessionsByType(type);

  //   // 만약 해당 타입의 세션이 아직 아무것도 없다면 타입 세션을 만듦
  //   if (!session) {
  //     server.sessions[type] = [];

  //     const userData = {
  //       uuid,
  //       clientKey,
  //     };
  //     server.sessions[type].push(userData);
  //   } else {
  //     // 존재한다면 해당 유저가 이미 세션에 가입되어 있는지 확인
  //     const user = session.find((findId) => findId === uuid);
  //     // 유저가 없다면 해당 세션에 추가
  //     if (!user) {
  //       session.push(uuid);
  //     }
  //   }

  //   console.log(server.sessions);

  // Response는 어떻게 처리할지 결정 후 작업
  // const packetForService = createPacketS2S(
  //   config.servicePacket.JoinSessionResponse,
  //   'session',
  //   'account',
  //   payloadDataForService,
  // );

  // server.clientToDistributor.write();
};
