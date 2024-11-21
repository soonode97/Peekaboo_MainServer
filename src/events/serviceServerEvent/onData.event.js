// TcpServer 인스턴스의 서버가 게임 클라로부터 Data를 받았을 때 처리하는 이벤트
export const onData = (socket) => async (data) => {
  console.log(
    `${socket.remoteAddress}로 부터 전달받은 onData Event 실행: `,
    data,
  );
};
