/**
 * 서비스 to 서비스,
 * 서비스 to distributor,
 * distributro to 서비스
 *
 * 패킷정의: TCP 통신
 *
 * [헤더]
 * 1. packetType 2바이트
 * 2. payloadLength 4바이트
 * 3. payload bytes
 *
 * [통신 특징]
 * 1. 패킷 타입에 따라 핸들러로 구분
 * 2. 모든 서비스와 distributor는 공통된 패킷 파싱과 패킹을 수행
 * 3. 추후 packetType 앞에 목적지를 저장하여 구분하는 것도 방법
 */
export const SERVICES_HEADER = {
  TOTAL_HEADER_LENGTH: 6,
  PACKET_TYPE_LENGTH: 2,
  PAYLOAD_LENGTH: 4,
};

/**
 *  클라이언트 to 게이트
 *
 * 패킷정의: 명세 참고
 */
export const CLIENTS_HEADER = {
  TOTAL_HEADER_LENGTH_EXCEPT_VERSION: 11,
  PACKET_TYPE_LENGTH: 2,
  VERSION_LENGTH: 1,
  PAYLOAD_LENGTH: 4,
  SEQUENCE_LENGTH: 4,
  CLIENT_KEY_LENGTH: 1,
};

export const ROUTES_HEADER = {
  TOTAL_HEADER_LENGTH: 7,
  PACKET_TYPE_LENGTH: 2,
  CLIENT_KEY_LENGTH: 1,
  PAYLOAD_LENGTH: 4,
};
