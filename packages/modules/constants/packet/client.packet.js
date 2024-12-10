const CLIENT_PACKET = {
  account: {
    RegistAccountRequest: 500,
    RegistAccountResponse: 501,
    LoginRequest: 502,
    LoginResponse: 503,
    ChangeNicknameRequest: 504,
    ChangeNicknameResponse: 505,
  },
  lobby: {
    EnterLobbyRequest: 506,
    EnterLobbyResponse: 507,
    RefreshLobbyRequest: 508,
    RefreshLobbyResponse: 509,
    SearchRoomRequest: 510,
    SearchRoomResponse: 511,
  },
};

export default CLIENT_PACKET;
