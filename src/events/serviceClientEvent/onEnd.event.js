export const onEnd = (client) => async (err) => {
  if (client.onEnd) {
    client.onEnd(client.options, err);
  }
};
