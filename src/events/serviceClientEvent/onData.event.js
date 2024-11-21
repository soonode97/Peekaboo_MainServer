export const onData = (client) => async (data) => {
  client.onRead(client.options, JSON.parse(data));
};
