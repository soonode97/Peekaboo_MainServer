const CLIENT_PACKET = {
  account: {
    LoginRequest: 16,
    LoginResponse: 17, // 응답 성공하면 로비에 진입
  },
  lobby: {
    RegistAccountRequest: 500,
    RegistAccountResponse: 501,
    LoginRequest: 502,
    LoginResponse: 503,
    ChangeNicknameRequest: 504,
    ChangeNicknameResponse: 505,
    EnterLobbyRequest: 506,
    EnterLobbyResponse: 507,
    RefreshLobbyRequest: 508,
    RefreshLobbyResponse: 509,
    SearchRoomRequest: 510,
    SearchRoomResponse: 511,
  },
};

export default CLIENT_PACKET;
