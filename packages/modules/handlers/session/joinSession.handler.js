import { createPacketS2S } from '../../../common/utils/packet/create.packet';

export const joinSessionHandler = async (server, data) => {
  const { uuid, type } = data;

  const session = server.getSessionsByType(type);

  // 만약 해당 타입의 세션이 아직 아무것도 없다면 타입 세션을 만듦
  if (!session) {
    server.sessions[type] = [];
    server.sessions[type].push(uuid);
  } else {
    // 존재한다면 해당 유저가 이미 세션에 가입되어 있는지 확인
    const user = session.find((findId) => findId === uuid);
    // 유저가 없다면 해당 세션에 추가
    if (!user) {
      session.push(uuid);
    }
  }

  // Response는 어떻게 처리할지 결정 후 작업
  // const packetForService = createPacketS2S(
  //   config.servicePacket.JoinSessionResponse,
  //   'session',
  //   'account',
  //   payloadDataForService,
  // );

  server.clientToDistributor.write();
};
