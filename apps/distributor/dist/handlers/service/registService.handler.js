import { sendInfo } from "../../notifications/connection.notification.js";
import { serviceMap } from "../../data/connection.data.js";
const registServiceHandler = (socket, payload) => {
  const key = socket.remoteAddress + ":" + socket.remotePort;
  serviceMap[key] = {
    socket
  };
  serviceMap[key].info = payload;
  sendInfo();
};
export {
  registServiceHandler
};
//# sourceMappingURL=registService.handler.js.map
