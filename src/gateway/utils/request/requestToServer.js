export const serializerToServer = (
  packetType,
  address,
  port,
  payloadBuffer,
) => {
  const packetBuffer = Buffer.alloc(2);
  packetBuffer.writeUInt16BE(packetType);
  const addressLengthBuffer = Buffer.alloc(1);
  addressLengthBuffer.writeUInt8(address.length);
  const addressBuffer = Buffer.from(address);
  const portBuffer = Buffer.alloc(1);
  portBuffer.writeUInt8(port);

  return Buffer.concat([
    packetBuffer,
    addressLengthBuffer,
    addressBuffer,
    portBuffer,
    payloadBuffer,
  ]);
};
