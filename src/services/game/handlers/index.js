import { PACKET_TYPE } from '../constants/header.js';

const handlers = {};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    return false;
  }

  return handlers[packetType].handler;
};

export const getProtoTypeByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    return false;
  }

  return handlers[packetType].protoType;
};
