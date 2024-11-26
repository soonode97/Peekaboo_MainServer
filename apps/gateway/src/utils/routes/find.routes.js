import { routingTable } from '../../source/router.source.js';
import { mapClients } from '../../source/router.source.js';

export const findRouterService = (packetType) => {
  console.log('findRouting...');
  const routingServiceName = routingTable[packetType];

  for (const [key, value] of Object.entries(mapClients)) {
    // console.log(`라우팅 탐색중... ${key} : ${value.info}`);
    if (value.info.name === routingServiceName) {
      // console.log('----라우팅서비스 찾음!----');
      return value.client;
    }
  }
};
