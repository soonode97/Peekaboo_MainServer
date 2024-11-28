import { SERVICE_PACKET } from '../../../modules/constants/packet.js';
import { EC1_HOST, SESSION_PORT } from '../env.js';
import SHARED_CONFIG from '../shared/index.js';

const SESSION_CONFIG = {
  ...SHARED_CONFIG,
  servicePacket: SERVICE_PACKET,
  session: {
    host: EC1_HOST,
    port: SESSION_PORT,
  },
};

export default SESSION_CONFIG;
