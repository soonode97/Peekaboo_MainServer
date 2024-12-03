export const findUserHandler = (serverInstance, data) => {
  console.log('findUser..........');

  const { sender, uuid, type, clientKey } = data;
  const requestChannel = `${sender}_service_request`;

  const session = serverInstance.getSessionsByType(type);

  if (!session) {
    serverInstance.redisClient.publish(requestChannel);
  }
};
