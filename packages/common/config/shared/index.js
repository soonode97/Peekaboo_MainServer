import {
  CLIENTS_HEADER,
  SERVICES_HEADER,
} from '../../../modules/constants/header.js';
import { PUB_ACTION } from '../../../modules/constants/pubsub/action.pubsub.js';
import { SUB_CHANNEL } from '../../../modules/constants/pubsub/channel.pubsub.js';
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
  SESSION_PORT,
} from '../env.js';

const SHARED_CONFIG = {
  version: CLIENT_VERSION,
  distributor: {
    host: EC1_HOST,
    port: DISTRIBUTOR_PORT,
  },
  session: {
    host: EC1_HOST,
    port: SESSION_PORT,
  },
  header: {
    service: {
      totalHeaderLength: SERVICES_HEADER.TOTAL_HEADER_LENGTH, // 8
      typeLength: SERVICES_HEADER.PACKET_TYPE_LENGTH, // 2
      payloadLength: SERVICES_HEADER.PAYLOAD_LENGTH, // 4
      senderLength: SERVICES_HEADER.SENDER_LENGTH, // 1
      receiverLength: SERVICES_HEADER.RECEIVER_LENGTH, // 1
    },
    client: {
      totalHeaderLengthExceptVersion:
        CLIENTS_HEADER.TOTAL_HEADER_LENGTH_EXCEPT_VERSION, // 11
      typeLength: CLIENTS_HEADER.PACKET_TYPE_LENGTH, // 2
      versionLength: CLIENTS_HEADER.VERSION_LENGTH, // 1
      sequenceLength: CLIENTS_HEADER.SEQUENCE_LENGTH, // 4
      payloadLength: CLIENTS_HEADER.PAYLOAD_LENGTH, // 4
      clientKeyLength: CLIENTS_HEADER.CLIENT_KEY_LENGTH, // 1
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
    SYSTEM_DB: {},
  },
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
  pubAction: PUB_ACTION,
  subChannel: SUB_CHANNEL,
};

export default SHARED_CONFIG;
