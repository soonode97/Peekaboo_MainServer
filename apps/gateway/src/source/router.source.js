import { createRoutingTable } from '../utils/routes/create.routes.js';
import config from '@peekaboo-ssr/config/gateway';

export const mapClients = {};
export const mapResponse = {}; // 처리해야할 응답값들 담는 공간 (mapResponse => 순서제어)
export const mapRR = {}; // 로드밸런싱 라운드로빈 (사실상 의미 없음 하지만 넣어줄순있음..)
export const routingTable = createRoutingTable(config.clientPacket);
