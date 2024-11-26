import { CLIENT_PACKET, SERVICE_PACKET } from '../../constants/packet.js';
import { ACCOUNT_PORT, EC1_HOST } from '../env.js';
import SHARED_CONFIG from '../shared/index.js';

const ACCOUNT_CONFIG = {
  ...SHARED_CONFIG,
  clientPacket: CLIENT_PACKET,
  servicePacket: SERVICE_PACKET,
  account: {
    host: EC1_HOST,
    port: ACCOUNT_PORT,
  },
};

export default ACCOUNT_CONFIG;
