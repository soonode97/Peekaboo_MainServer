export const onConnection = (socket) => {
  // console.log(`Client connected from: ${socket.remoteAddress}:${socket.remotePort}`);
  socket.buffer = Buffer.alloc(0);
  // 연결된 클라이언트 정보 세션저장 TODO - 문진수 작성

  socket.on("data", onData(socket));
  socket.on("end", onEnd(socket));
  socket.on("error", onError(socket));
};
