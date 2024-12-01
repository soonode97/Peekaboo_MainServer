import { CLIENT_PACKET } from '../../../modules/constants/packet/client.packet.js';
import { SERVICE_PACKET } from '../../../modules/constants/packet/service.packet.js';
import { ACCOUNT_PORT, EC1_HOST, SECRET_KEY } from '../env.js';
import SHARED_CONFIG from '../shared/index.js';

const ACCOUNT_CONFIG = {
  ...SHARED_CONFIG,
  clientPacket: CLIENT_PACKET,
  servicePacket: SERVICE_PACKET,
  account: {
    host: EC1_HOST,
    port: ACCOUNT_PORT,
  },
  jwt: {
    key: SECRET_KEY,
    expiresIn: '1h',
  },
};

export default ACCOUNT_CONFIG;
