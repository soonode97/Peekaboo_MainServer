import config from "@peekaboo-ssr/config/lobby";
import BaseEvent from "@peekaboo-ssr/events/BaseEvent";
class G2SEventHandler extends BaseEvent {
  onConnection(socket) {
    console.log(
      `Gate connected from: ${socket.remoteAddress}:${socket.remotePort}`
    );
    socket.buffer = Buffer.alloc(0);
  }
  async onData(socket, data) {
    console.log("Service\uAC00 \uAC8C\uC774\uD2B8\uB85C\uBD80\uD130 \uB370\uC774\uD130\uB97C \uBC1B\uC74C..");
    socket.buffer = Buffer.concat([socket.buffer, data]);
    while (socket.buffer.length >= config.header.service.typeLength) {
      let offset = 0;
      const packetType = socket.buffer.readUint16BE(offset);
      offset += config.header.service.typeLength;
      const payloadLength = socket.buffer.readUint32BE(offset);
      offset += config.header.service.payloadLength;
      const totalPacketLength = offset + payloadLength;
      if (socket.buffer.length < totalPacketLength) {
        break;
      }
      const payload = socket.buffer.subarray(offset, offset + payloadLength).toString("utf-8");
      socket.buffer = socket.buffer.subarray(totalPacketLength);
      try {
        const payloadObj = JSON.parse(payload);
        console.log(packetType);
        const handler = getHandlerByPacketType(packetType);
        await handler(socket, payloadObj);
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    }
  }
  onEnd(socket) {
    console.log("onClose", socket.remoteAddress, socket.remotePort);
  }
  onError(socket, err) {
    console.log("onClose", socket.remoteAddress, socket.remotePort);
  }
}
var onG2S_event_default = G2SEventHandler;
export {
  onG2S_event_default as default
};
//# sourceMappingURL=onG2S.event.js.map
