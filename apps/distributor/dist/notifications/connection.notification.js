import { serviceMap } from "../data/connection.data.js";
const sendInfo = (socket) => {
  const packet = {
    uri: "/distributes",
    method: "GET",
    key: 0,
    microservices: []
  };
  for (let i in serviceMap) {
    packet.microservices.push(serviceMap[i].info);
  }
  if (socket) {
    socket.write(JSON.stringify(packet));
  } else {
    for (let j in serviceMap) {
      serviceMap[j].socket.write(JSON.stringify(packet));
    }
  }
};
export {
  sendInfo
};
//# sourceMappingURL=connection.notification.js.map
