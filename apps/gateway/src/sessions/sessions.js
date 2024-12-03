export const connectSessions = [];

export const getSocketByClientKey = (clientKey) => {
  const session = connectSessions.find(
    (connection) => connection.clientKey == clientKey,
  );
  return session.socket;
};
