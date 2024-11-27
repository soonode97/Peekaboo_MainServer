import {
  CLIENT_PACKET,
  SERVICE_PACKET,
} from '../../../modules/constants/packet.js';
import { EC1_HOST, GATEWAY_PORT, SECRET_KEY } from '../env.js';
import SHARED_CONFIG from '../shared/index.js';

const GATEWAY_CONFIG = {
  ...SHARED_CONFIG,
  clientPacket: CLIENT_PACKET,
  servicePacket: SERVICE_PACKET,
  gateway: {
    host: EC1_HOST,
    port: GATEWAY_PORT,
  },
  auth: {
    secretKey: SECRET_KEY,
  },
};

export default GATEWAY_CONFIG;
