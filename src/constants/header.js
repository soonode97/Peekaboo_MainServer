export const TOTAL_HEADER_LENGTH_EXCEPT_VERSION = 11;
export const PACKET_TYPE_LENGTH = 2;
export const VERSION_LENGTH = 1;
export const SEQUENCE_LENGTH = 4;
export const PAYLOAD_LENGTH = 4;

export const CLIENT_PACKET_TYPE = {
  PlayerMoveRequest: 1,
  PlayerMoveNotification: 2,
  GhostMoveRequest: 3,
  GhostMoveNotification: 4,
  PingRequest: 5, // S2C
  PingResponse: 6, // C2S
  ConnectResponse: 16,
  ConnectGameRequest: 17,
  ConnectGameResponse: 18,
  SpawnInitialGhostRequest: 19,
  StartGameNotification: 20,
};

export const SERVICES_PACKET_TYPE = {
  RegistServiceRequest: 1,
  RegistServiceResponse: 2,
  GetServiceRequest: 3,
  GetServiceResponse: 4,
  PingReq: 5,
  PingRes: 6,
};
