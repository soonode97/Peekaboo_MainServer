export const PACKET_TYPE_LENGTH = 2;
export const VERSION_LENGTH = 1;
export const SEQUENCE_LENGTH = 4;
export const PAYLOAD_LENGTH = 4;
export const PACKET_TYPE = {
  RegisterUserRequest: 1,
  RegisterUserResponse: 2,
  LoginUserRequest: 3,
  LoginUserResponse: 4, // 응답 성공하면 로비에 진입
  EnterLobbyRequest: 5, // 로비 진입 요청
  EnterLobbyResponse: 6, // 로비 진입 성공 응답 - 플레이어 정보를 불러와서 보내줌
  EnterWaitingRoomRequest: 10, // 대기실 진입 요청
  EnterWaitingRoomResponse: 11, // 대기실 진입 성공 시 응답, 대기방 목록 리스트 보냄
  RefreshWaitingRoomRequest: 12, // 대기실 새로고침 요청
  RefreshWaitingRoomResponse: 13, // 대기실 새로고침 응답
  FilterRoomByHostUserRequest: 14, // 대기실 호스트 유저 필터 요청
  FilterRoomByHostUserResponse: 15, // 대기실 호스트 유저 필터 응답, 해당 유저의 대기방 정보 보냄
  // 정렬은 추후 고려,
  CreateWaitingRoomRequest: 20, // 대기방 생성 요청
  CreateWaitingRoomNotification: 21, // 대기방 생성 응답 (전체 클라, 단 로비 서버에 접속해있는 유저만)
  JoinWaitingRoomRequest: 28, // 대기방 참가 요청
  JoinWaitingRoomResponse: 29, // 대기방 참가 응답, 해당 대기방에 속한 유저 정보 보냄
  PrepareStartRequest: 30, // 대기방 게임 시작 준비 요청
  PrepareStartResponse: 31, // 대기방 게임 시작 준비 응답
  StartGameFromRoomRequest: 32, // 대기방 게임 시작 요청
  StartGameFromRoomNotification: 33, // 대기방 게임 시작 응답 (전체 클라)
  DisconnectWaitingRoomRequest: 34, // 대기방 연결 종료 요청
  DisconnectWaitingRoomResponse: 35, // 대기방 연결 종료 응답
  // 이후 추가적으로 옵션에 대한 부분이 나온다면 추가 필요
};
