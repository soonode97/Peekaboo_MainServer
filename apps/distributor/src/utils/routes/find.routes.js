import { serviceMap } from '../../source/connection.source.js';

// Distributor에서 receiver에 맞는 라우팅을 찾는 함수
export const findClientByReceiver = (receiver) => {
  for (const [key, value] of Object.entries(serviceMap)) {
    if (value.info.name == receiver) {
      return value.socket;
    }
  }
  return null;
};
