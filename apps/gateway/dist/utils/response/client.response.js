import { createPacketG2C } from "@peekaboo-ssr/utils";
const sendPacketToClient = (packetType, client, payloadBuffer) => {
  const packet = createPacketG2C(packetType, payloadBuffer, client.sequence);
  console.log("\uBCF4\uB0BC \uBC84\uD37C: ", packet);
  client.write(packet);
};
export {
  sendPacketToClient
};
//# sourceMappingURL=client.response.js.map
