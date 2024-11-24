import BaseHandler from '@peekaboo-ssr/handler/BaseHandler';

class FromServiceHandler extends BaseHandler {
  onConnection(socket) {
    console.log(
      `Client connected from: ${socket.remoteAddress}:${socket.remotePort}`,
    );
    socket.buffer = Buffer.alloc(0);
  }

  // 게이트웨이에서는 헤더 검증 및 라우팅까지만 수행.
  // 라우팅 시 어떤 유저가 보낸건지 저장하여 수행하도록 함.
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

export default FromServiceHandler;
