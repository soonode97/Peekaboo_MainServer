import {
  SERVER_HOST,
  MAIN_NET_PORT,
  CLIENT_VERSION,
  SECRET_KEY,
  DB1_NAME,
  DB2_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
} from '../constants/env.js';

import {
  PACKET_TYPE_LENGTH,
  VERSION_LENGTH,
  SEQUENCE_LENGTH,
  PAYLOAD_LENGTH,
} from '../constants/header.js';

export const config = {
  server: {
    host: SERVER_HOST,
    port: MAIN_NET_PORT,
  },
  client: {
    clientVersion: CLIENT_VERSION,
  },
  packet: {
    typeLength: PACKET_TYPE_LENGTH,
    versionLength: VERSION_LENGTH,
    sequenceLength: SEQUENCE_LENGTH,
    payloadLength: PAYLOAD_LENGTH,
  },
  db: {
    game_db: DB1_NAME,
    user_db: DB2_NAME,
    host: DB_HOST,
    password: DB_PASSWORD,
    port: DB_PORT,
  },
  auth: {
    secret_key: SECRET_KEY,
  },
};
