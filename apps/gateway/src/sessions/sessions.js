export const connectSessions = [];

export const getSocketByRemote = (remote) => {
  const session = connectSessions.find((connection) => {
    connection.remote === remote;
  });

  return session.socket;
};
