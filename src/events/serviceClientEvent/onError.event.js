export const onError = (client) => async (err) => {
  if (client.onError) {
    client.onError(client.options, err);
  }
};
