import { createRoutingTable } from '../utils/routes/create.routes.js';
import config from '@peekaboo-ssr/config/gateway';

export const mapClients = {};
export const mapResponse = {};
export const mapRR = {};
export const routingTable = createRoutingTable(config.clientPacket);
