import { PACKET_TYPE } from './haeader.js';

export const packetNames = {
  common: {
    GamePacket: 'common.GamePacket',
  },
  auth: {
    C2S_ConnectGameRequest: 'auth.C2S_ConnectGameRequest',
    S2C_ConnectGameNotification: 'auth.S2C_ConnectGameNotification',
    S2C_ConnectNotification: 'auth.S2C_ConnectNotification',
  },
};

export const PACKET_MAPS = {
  [PACKET_TYPE.ConnectGameRequest]: 'connectGameRequest',
  [PACKET_TYPE.ConnectGameNotification]: 'connectGameNotification',
};
