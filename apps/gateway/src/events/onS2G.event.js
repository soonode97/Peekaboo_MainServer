import BaseEvent from '@peekaboo-ssr/events/BaseEvent';
import config from '@peekaboo-ssr/config/gateway';

class S2GEventHandler extends BaseEvent {
  onConnection(socket) {
    console.log(
      `Service connected from: ${socket.remoteAddress}:${socket.remotePort}`,
    );
    socket.buffer = Buffer.alloc(0);
  }

  async onData(socket, data) {
    console.log(
      `${socket.remoteAddress}로 부터 전달받은 onData Event 실행: `,
      data,
    );
  }

  onEnd(socket) {
    console.log(
      'Disconnected Service: ',
      socket.remoteAddress,
      socket.remotePort,
    );
  }

  onError(socket, err) {
    console.log(
      'Disconnected Service: ',
      socket.remoteAddress,
      socket.remotePort,
    );
  }
}

export default S2GEventHandler;
