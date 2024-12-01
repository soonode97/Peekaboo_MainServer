import { CLIENT_PACKET } from '../../../modules/constants/packet/client.packet.js';
import { SERVICE_PACKET } from '../../../modules/constants/packet/service.packet.js';
import { EC1_HOST, LOBBY_PORT } from '../env.js';
import SHARED_CONFIG from '../shared/index.js';

const LOBBY_CONFIG = {
  ...SHARED_CONFIG,
  clientPacket: CLIENT_PACKET,
  servicePacket: SERVICE_PACKET,
  lobby: {
    host: EC1_HOST,
    port: LOBBY_PORT,
  },
};

export default LOBBY_CONFIG;
