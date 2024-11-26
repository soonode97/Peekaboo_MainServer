import { CLIENTS_HEADER, SERVICES_HEADER } from '../../constants/header.js';
import {
  DB1_NAME,
  DB2_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  EC1_HOST,
  DISTRIBUTOR_PORT,
  CLIENT_VERSION,
} from '../env.js';

const SHARED_CONFIG = {
  version: CLIENT_VERSION,
  distributor: {
    host: EC1_HOST,
    port: DISTRIBUTOR_PORT,
  },
  header: {
    service: {
      totalHeaderLength: SERVICES_HEADER.TOTAL_HEADER_LENGTH,
      typeLength: SERVICES_HEADER.PACKET_TYPE_LENGTH,
      payloadLength: SERVICES_HEADER.PAYLOAD_LENGTH,
    },
    client: {
      totalHeaderLengthExceptVersion:
        CLIENTS_HEADER.TOTAL_HEADER_LENGTH_EXCEPT_VERSION,
      typeLength: CLIENTS_HEADER.PACKET_TYPE_LENGTH,
      versionLength: CLIENTS_HEADER.VERSION_LENGTH,
      sequenceLength: CLIENTS_HEADER.SEQUENCE_LENGTH,
      payloadLength: CLIENTS_HEADER.PAYLOAD_LENGTH,
      clientKeyLength: CLIENTS_HEADER.CLIENT_KEY_LENGTH,
    },
  },
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
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
};

export default SHARED_CONFIG;
