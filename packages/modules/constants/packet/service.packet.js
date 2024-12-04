export const SERVICE_PACKET = {
  ConnectServiceRequest: 1,
  ConnectedServiceNotification: 2,
  DisconnectServiceRequest: 3,
  DisconnectedServiceNotification: 4,
};

export const SERVICE_PACKET_MAPS = {
  [SERVICE_PACKET.ConnectServiceRequest]: 'connectServiceRequest',
  [SERVICE_PACKET.ConnectedServiceNotification]: 'connectedServiceNotification',
  [SERVICE_PACKET.DisconnectServiceRequest]: 'disconnectServiceRequest',
  [SERVICE_PACKET.DisconnectedServiceNotification]:
    'disconnectedServiceNotification',
};
