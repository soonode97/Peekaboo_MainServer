import SHARED_CONFIG from '../shared/index.js';
import { DISTRIBUTOR_PACKET } from '../../constants/packet.js';

const DISTRIBUTOR_CONFIG = {
  ...SHARED_CONFIG,
  ...DISTRIBUTOR_PACKET,
};

export default DISTRIBUTOR_CONFIG;
