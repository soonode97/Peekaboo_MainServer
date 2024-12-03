/**
 * 서비스 to 서비스,
 * 서비스 to distributor,
 * distributor to 서비스
 *
 * 패킷정의: TCP 통신
 *
 * [헤더]
 * 1. 패킷 타입 2 byte
 * 2. 보내는 서비스 길이 1 byte
 * 3. 보내는 서비스 bytes
 * 4. 받는 서비스 길이 1 byte
 * 5. 받는 서비스 bytes
 * 6. 페이로드 길이 4 byte
 * 7. 페이로드 bytes
 *
 * [통신 특징]
 * 1. 패킷 타입에 따라 핸들러로 구분
 * 2. 모든 서비스와 distributor는 공통된 패킷 파싱과 패킹을 수행
 * 3. 추후 packetType 앞에 목적지를 저장하여 구분하는 것도 방법
 */
export const SERVICES_HEADER = {
  TOTAL_HEADER_LENGTH: 8,
  PACKET_TYPE_LENGTH: 2,
  SENDER_LENGTH: 1,
  RECEIVER_LENGTH: 1,
  PAYLOAD_LENGTH: 4,
};

/**
 * 클라이언트 to 게이트
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
