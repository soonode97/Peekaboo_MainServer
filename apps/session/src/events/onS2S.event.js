import BaseEvent from '@peekaboo-ssr/events/BaseEvent';

class S2SEventHandler extends BaseEvent {
  onConnection(server) {
    console.log(`Distributor connected from: ${server.host}:${server.port}`);
  }

  // 여기는 추후 데이터 어떤 방식으로 송수신할건지 정의되면 바뀔 수 있음.
  onData(server, data) {
    const parsedData = JSON.parse(data);
    console.log('Distributor data: ', parsedData);
  }

  onEnd(server) {
    console.log('Distributor connection ended');
  }

  onError(server, err) {
    console.error('Error with Distributor connection:', err);
  }
}

export default S2SEventHandler;
