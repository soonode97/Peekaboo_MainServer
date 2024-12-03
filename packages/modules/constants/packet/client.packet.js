export const CLIENT_PACKET = {
  account: {
    LoginRequest: 16,
    LoginResponse: 17, // 응답 성공하면 로비에 진입
  },
  lobby: {
    EnterLobbyRequest: 501, // 로비 진입 요청
    EnterLobbyResponse: 502, // 로비 진입 성공 응답 - 대기실 리스트 정보를 불러와서 보내줌
    UpdateSettingRequest: 503, // 설정 변경 요청
    UpdateSettingResponse: 504, // 설정 변경 저장에 따른 응답 - 추후 프리셋 / 롤백에 대비하여 미리 세팅값 저장
    EnterListOfRoomRequest: 505, // 대기실 리스트 진입 요청
    EnterListOfRoomResponse: 506, // 대기실 리스트 진입 성공 시 응답, 대기방 목록 리스트 보냄
    RefreshListOfRoomRequest: 507, // 대기실 리스트 새로고침 요청
    RefreshListOfRoomResponse: 508, // 대기실 리스트 새로고침 응답
    FilterRoomByHostUserRequest: 509, // 대기실 리스트 호스트 유저 필터 요청
    FilterRoomByHostUserResponse: 510, // 대기실 리스트호스트 유저 필터 응답, 해당 유저의 대기방 정보 보냄
    SearchRoomRequest: 511, // 대기실 리스트 검색 요청
    SearchRoomResponse: 512, // 대기실 리스트 검색 응답
    // 정렬은 추후 고려,
    CreateWaitingRoomRequest: 513, // 대기방 생성 요청
    CreateWaitingRoomResponse: 514, // 대기방 생성 응답
    CreateWaitingRoomNotification: 515, // 대기방 생성 알림 (전체 클라, 단 로비 서버에 접속해있는 유저만)
    JoinWaitingRoomRequest: 516, // 대기방 참가 요청
    JoinWaitingRoomResponse: 517, // 대기방 참가 응답, 해당 대기방에 속한 유저 정보 보냄
    // 이후 추가 필요
  },
};

export const CLIENT_PACKET_MAPS = {
  [CLIENT_PACKET.account.CreateUserRequest]: 'createUserRequest',
  [CLIENT_PACKET.account.CreateUserResponse]: 'createUserResponse',
  [CLIENT_PACKET.account.LoginRequest]: 'loginRequest',
  [CLIENT_PACKET.account.LoginResponse]: 'loginResponse',
  [CLIENT_PACKET.lobby.EnterLobbyRequest]: 'enterLobbyRequest',
  [CLIENT_PACKET.lobby.EnterLobbyResponse]: 'enterLobbyResponse',
  [CLIENT_PACKET.lobby.UpdateSettingRequest]: 'updateSettingRequest',
  [CLIENT_PACKET.lobby.UpdateSettingResponse]: 'updateSettingResponse',
  [CLIENT_PACKET.lobby.EnterListOfRoomRequest]: 'enterListOfRoomRequest',
  [CLIENT_PACKET.lobby.EnterListOfRoomResponse]: 'enterListOfRoomResponse',
  [CLIENT_PACKET.lobby.RefreshListOfRoomRequest]: 'refreshListOfRoomRequest',
  [CLIENT_PACKET.lobby.RefreshListOfRoomResponse]: 'refreshListOfRoomResponse',
  [CLIENT_PACKET.lobby.FilterRoomByHostUserRequest]:
    'filterRoomByHostUserRequest',
  [CLIENT_PACKET.lobby.FilterRoomByHostUserResponse]:
    'filterRoomByHostUserResponse',
  [CLIENT_PACKET.lobby.SearchRoomRequest]: 'searchRoomRequest',
  [CLIENT_PACKET.lobby.SearchRoomResponse]: 'searchRoomResponse',
  [CLIENT_PACKET.lobby.CreateWaitingRoomRequest]: 'createWaitingRoomRequest',
  [CLIENT_PACKET.lobby.CreateWaitingRoomResponse]: 'createWaitingRoomResponse',
  [CLIENT_PACKET.lobby.CreateWaitingRoomNotification]:
    'createWaitingRoomNotification',
  [CLIENT_PACKET.lobby.JoinWaitingRoomRequest]: 'joinWaitingRoomRequest',
  [CLIENT_PACKET.lobby.JoinWaitingRoomResponse]: 'joinWaitingRoomResponse',
};
