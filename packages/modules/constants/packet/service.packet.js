export const SERVICE_PACKET = {
  ConnectServiceRequest: 1,
  ConnectedServiceNotification: 2,
  DisconnectServiceRequest: 3,
  DisconnectedServiceNotification: 4,
  JoinSessionRequest: 5,
  JoinSessionResponse: 6,
  ExitSessionRequest: 7,
  ExitSessionResponse: 8,
  FindUserRequest: 9,
  FindUserResponse: 10,
};

export const SERVICE_PACKET_MAPS = {
  [SERVICE_PACKET.ConnectServiceRequest]: 'connectServiceRequest',
  [SERVICE_PACKET.ConnectedServiceNotification]: 'connectedServiceNotification',
  [SERVICE_PACKET.DisconnectServiceRequest]: 'disconnectServiceRequest',
  [SERVICE_PACKET.DisconnectedServiceNotification]:
    'disconnectedServiceNotification',
  [SERVICE_PACKET.JoinSessionRequest]: 'joinSessionRequest',
  [SERVICE_PACKET.JoinSessionResponse]: 'joinSessionResponse',
  [SERVICE_PACKET.ExitSessionRequest]: 'exitSessionRequest',
  [SERVICE_PACKET.ExitSessionResponse]: 'exitSessionResponse',
  [SERVICE_PACKET.FindUserRequest]: 'findUserRequest',
  [SERVICE_PACKET.FindUserResponse]: 'findUserResponse',
};
