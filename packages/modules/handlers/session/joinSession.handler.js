import { createPacketS2S } from '../../../common/utils/packet/create.packet.js';

export const joinSessionHandler = async (server, data) => {
  const { uuid, type, clientKey } = data;

  const session = server.getSessionsByType(type);

  const userData = {
    uuid,
    clientKey,
  };

  // 만약 해당 타입의 세션이 아직 아무것도 없다면 타입 세션을 만듦
  if (!session) {
    server.sessions[type] = [];

    server.sessions[type].push(userData);
  } else {
    // 존재한다면 해당 유저가 이미 세션에 가입되어 있는지 확인
    const user = session.find((user) => user.uuid === uuid);
    // 유저가 없다면 해당 세션에 추가
    if (!user) {
      session.push(userData);
    }
  }

  console.log(server.sessions);

  // Response는 어떻게 처리할지 결정 후 작업
  // const packetForService = createPacketS2S(
  //   config.servicePacket.JoinSessionResponse,
  //   'session',
  //   'account',
  //   payloadDataForService,
  // );

  // server.clientToDistributor.write();
};

/**
 * 뭔가 특정 세션에 대해 처리해야하는 알림이 있거나 추방이라던가 등 이벤트가 필요할 때
 * user : [...],
 * game: [...],
 * lobby: [...],
 * => ** 메모리 낭비가 있다.
 * => 특정 세션으로 옮기는 로직쓰면 됨
 * => 하나의 배열을 그냥 집어서 socket 반복해서 버퍼 보내면 끝
 *
 * user: {
 * uuid: {
 *  type: ...,
 *  socket: socket
 *  },
 * uuid: {
 *  type: ...,
 *  },
 * uuid: {
 *  type: ...,
 *  }
 * }
 * => 찾는 조건이 조금 더 복잡하다.
 * => 특정 세션을 찾으려면 type 먼저 구분하면서 해당 socket에 버퍼를 보냄
 */

/**
 * 소켓을 어떻게 가져다 쓸까?
 */
