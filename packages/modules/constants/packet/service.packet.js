export const SERVICE_PACKET = {
  CreateServiceRequest: 1,
  CreatedServiceNotification: 2,
  DeleteServiceRequest: 3,
  DeleteServiceNotification: 4,
  JoinUserSessionRequest: 5,
  JoinUserSessionResponse: 6,
  ExitUserSessionRequest: 7,
  ExitUserSessionResponse: 8,
};

export const SERVICE_PACKET_MAPS = {
  [SERVICE_PACKET.CreateServiceRequest]: 'createServiceRequest',
  [SERVICE_PACKET.CreatedServiceNotification]: 'createdServiceNotification',
  [SERVICE_PACKET.DeleteServiceRequest]: 'deleteServiceRequest',
  [SERVICE_PACKET.DeleteServiceNotification]: 'deleteServiceNotification',
  [SERVICE_PACKET.JoinUserSessionRequest]: 'joinUserSessionRequest',
  [SERVICE_PACKET.JoinUserSessionResponse]: 'joinUserSessionResponse',
  [SERVICE_PACKET.ExitUserSessionRequest]: 'exitUserSessionRequest',
  [SERVICE_PACKET.ExitUserSessionResponse]: 'exitUserSessionResponse',
};
