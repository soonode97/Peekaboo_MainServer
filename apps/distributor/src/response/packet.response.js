// 접속한 마이크로서비스에게 패킷을 전송하는 메서드
export const sendPacket = (socket, packet) => {
  console.log('distributor가 서비스에게 보낼 패킷: ', packet);
  // 패킷 그대로 전송하도록 함.
  socket.write(JSON.stringify(packet));
};
