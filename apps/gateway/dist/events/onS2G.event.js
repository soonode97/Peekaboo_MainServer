import BaseEvent from "@peekaboo-ssr/events/BaseEvent";
import config from "@peekaboo-ssr/config/gateway";
import { getSocketByRemote } from "../sessions/sessions.js";
import { sendPacketToClient } from "../utils/response/client.response.js";
class S2GEventHandler extends BaseEvent {
  onConnection(socket) {
    console.log(
      `Service connected from: `,
      socket.options.host,
      socket.options.port
    );
    socket.buffer = Buffer.alloc(0);
  }
  async onData(socket, data) {
    console.log("\uAC8C\uC774\uD2B8\uAC00 \uC11C\uBE44\uC2A4\uB85C\uBD80\uD130 \uB370\uC774\uD130\uB97C \uBC1B\uC74C..", data);
    socket.buffer = Buffer.concat([socket.buffer, data]);
    while (socket.buffer.length >= config.header.client.typeLength + config.header.client.clientKeyLength) {
      let offset = 0;
      const packetType = socket.buffer.readUint16BE(offset);
      offset += config.header.client.typeLength;
      console.log(packetType);
      const clientKeyLength = socket.buffer.readUInt8(offset);
      offset += config.header.client.clientKeyLength;
      console.log(clientKeyLength);
      const clientKey = socket.buffer.subarray(offset, offset + clientKeyLength).toString();
      console.log(clientKey);
      offset += clientKeyLength;
      const totalHeaderLength = config.header.client.typeLength + config.header.client.clientKeyLength + clientKeyLength;
      if (socket.buffer.length < totalHeaderLength) {
        break;
      }
      const payloadLength = socket.buffer.readUint32BE(offset);
      offset += config.header.client.payloadLength;
      console.log(payloadLength);
      const totalPacketLength = totalHeaderLength + payloadLength;
      if (socket.buffer.length < totalPacketLength) {
        break;
      }
      const payloadBuffer = socket.buffer.subarray(
        offset,
        offset + payloadLength
      );
      offset += payloadLength;
      try {
        socket.buffer = socket.buffer.subarray(offset);
        const client = getSocketByRemote(clientKey);
        if (!client) {
          throw new Error("\uD074\uB77C\uC774\uC5B8\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC74C!!");
        }
        sendPacketToClient(packetType, client, payloadBuffer);
      } catch (e) {
        console.error(e);
      }
    }
  }
  onEnd(socket) {
    console.log(
      "Disconnected Service: ",
      socket.remoteAddress,
      socket.remotePort
    );
  }
  onError(socket, err) {
    console.log(
      "Disconnected Service: ",
      socket.remoteAddress,
      socket.remotePort
    );
  }
}
var onS2G_event_default = S2GEventHandler;
export {
  onS2G_event_default as default
};
//# sourceMappingURL=onS2G.event.js.map
