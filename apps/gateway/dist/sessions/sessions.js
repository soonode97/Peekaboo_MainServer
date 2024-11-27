const connectSessions = [];
const getSocketByRemote = (remote) => {
  const session = connectSessions.find(
    (connection) => connection.remote == remote
  );
  return session.socket;
};
export {
  connectSessions,
  getSocketByRemote
};
//# sourceMappingURL=sessions.js.map
