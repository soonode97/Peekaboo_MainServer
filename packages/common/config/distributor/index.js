import SHARED_CONFIG from '../shared/index.js';
import { SERVICE_PACKET } from '../../../modules/constants/packet/service.packet.js';

const DISTRIBUTOR_CONFIG = {
  ...SHARED_CONFIG,
  servicePacket: SERVICE_PACKET,
};

export default DISTRIBUTOR_CONFIG;
