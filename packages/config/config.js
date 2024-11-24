import {
  CLIENT_VERSION,
  SECRET_KEY,
  DB1_NAME,
  DB2_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  DISTRIBUTOR_PORT,
  EC1_HOST,
  LOBBY_NET_PORT,
  GATEWAY_PORT,
  EC2_HOST,
  GAME_NET_PORT,
} from './constants/env.js';

import {
  PACKET_TYPE_LENGTH,
  VERSION_LENGTH,
  SEQUENCE_LENGTH,
  PAYLOAD_LENGTH
} from './constants/header.js';

import {
  GLOBAL_FAIL_CODE,
  USER_STATE,
} from './constants/state.js';

import { PACKET_MAPS, 
  CLIENT_PACKET_TYPE,
  SERVICES_PACKET_TYPE,
  PACKET_NAMES } from './constants/packet.js';

export const config = {
  client: {
    clientVersion: CLIENT_VERSION,
  },
  packetHeader: {
    typeLength: PACKET_TYPE_LENGTH,
    versionLength: VERSION_LENGTH,
    sequenceLength: SEQUENCE_LENGTH,
    payloadLength: PAYLOAD_LENGTH,
  },
  packetType: {
    client: CLIENT_PACKET_TYPE,
    service: SERVICES_PACKET_TYPE
  },
  packetMaps: PACKET_MAPS,
  packetNames: PACKET_NAMES,
  databases: {
    USER_DB: {
      name: DB1_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
    GAME_DB: {
      name: DB2_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
  },
  auth: {
    secret_key: SECRET_KEY,
  },
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
  distributor: {
    host: EC1_HOST,
    port: DISTRIBUTOR_PORT,
  },
  lobbyServer: {
    host: EC1_HOST,
    port: LOBBY_NET_PORT,
  },
  gatewayServer: {
    host: EC1_HOST,
    port: GATEWAY_PORT,
  },
  gameServer: {
    host: EC2_HOST,
    port: GAME_NET_PORT,
  },
  state: {
    user: {
      stay: USER_STATE.STAY,
      inGame: USER_STATE.INGAME,
    },
    failCode: {
      none: GLOBAL_FAIL_CODE.NONE,
      unknown: GLOBAL_FAIL_CODE.UNKNOWN_ERROR,
      invalid: GLOBAL_FAIL_CODE.INVALID_REQUEST,
      authFailed: GLOBAL_FAIL_CODE.AUTHENTICATION_FAILED
    },
  },
};