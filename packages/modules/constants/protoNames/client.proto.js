import clientPacket from '@peekaboo-ssr/modules-constants/clientPacket';

const CLIENT_PACKET_MAPS = {
  [clientPacket.account.CreateUserRequest]: 'createUserRequest',
  [clientPacket.account.CreateUserResponse]: 'createUserResponse',
  [clientPacket.account.LoginRequest]: 'loginRequest',
  [clientPacket.account.LoginResponse]: 'loginResponse',
  [clientPacket.lobby.EnterLobbyRequest]: 'enterLobbyRequest',
  [clientPacket.lobby.EnterLobbyResponse]: 'enterLobbyResponse',
  [clientPacket.lobby.UpdateSettingRequest]: 'updateSettingRequest',
  [clientPacket.lobby.UpdateSettingResponse]: 'updateSettingResponse',
  [clientPacket.lobby.EnterListOfRoomRequest]: 'enterListOfRoomRequest',
  [clientPacket.lobby.EnterListOfRoomResponse]: 'enterListOfRoomResponse',
  [clientPacket.lobby.RefreshListOfRoomRequest]: 'refreshListOfRoomRequest',
  [clientPacket.lobby.RefreshListOfRoomResponse]: 'refreshListOfRoomResponse',
  [clientPacket.lobby.FilterRoomByHostUserRequest]:
    'filterRoomByHostUserRequest',
  [clientPacket.lobby.FilterRoomByHostUserResponse]:
    'filterRoomByHostUserResponse',
  [clientPacket.lobby.SearchRoomRequest]: 'searchRoomRequest',
  [clientPacket.lobby.SearchRoomResponse]: 'searchRoomResponse',
  [clientPacket.lobby.CreateWaitingRoomRequest]: 'createWaitingRoomRequest',
  [clientPacket.lobby.CreateWaitingRoomResponse]: 'createWaitingRoomResponse',
  [clientPacket.lobby.CreateWaitingRoomNotification]:
    'createWaitingRoomNotification',
  [clientPacket.lobby.JoinWaitingRoomRequest]: 'joinWaitingRoomRequest',
  [clientPacket.lobby.JoinWaitingRoomResponse]: 'joinWaitingRoomResponse',
};

export default CLIENT_PACKET_MAPS;
