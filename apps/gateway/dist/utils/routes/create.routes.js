const createRoutingTable = (clientPacket) => {
  const routingTable = {};
  for (const serverName in clientPacket) {
    const packets = clientPacket[serverName];
    for (const packetName in packets) {
      const packetId = packets[packetName];
      routingTable[packetId] = serverName;
    }
  }
  console.log(routingTable);
  return routingTable;
};
export {
  createRoutingTable
};
//# sourceMappingURL=create.routes.js.map
