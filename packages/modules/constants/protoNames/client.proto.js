import clientPacket from '@peekaboo-ssr/modules-constants/clientPacket';

const CLIENT_PACKET_MAPS = {
  [clientPacket.account.RegistAccountRequest]: 'registAccountRequest',
  [clientPacket.account.RegistAccountResponse]: 'registAccountResponse',
  [clientPacket.account.LoginRequest]: 'loginRequest',
  [clientPacket.account.LoginResponse]: 'loginResponse',
  [clientPacket.account.ChangeNicknameRequest]: 'changeNicknameRequest',
  [clientPacket.account.ChangeNicknameResponse]: 'changeNicknameResponse',
  [clientPacket.lobby.EnterLobbyRequest]: 'enterLobbyRequest',
  [clientPacket.lobby.EnterLobbyResponse]: 'enterLobbyResponse',
  [clientPacket.lobby.RefreshLobbyRequest]: 'refreshLobbyRequest',
  [clientPacket.lobby.RefreshLobbyResponse]: 'refreshLobbyResponse',
  [clientPacket.lobby.SearchRoomRequest]: 'searchRoomRequest',
  [clientPacket.lobby.SearchRoomResponse]: 'searchRoomResponse',
};

export default CLIENT_PACKET_MAPS;
