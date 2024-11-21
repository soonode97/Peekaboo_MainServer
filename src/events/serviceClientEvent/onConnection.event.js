import { onData } from './onData.event.js';
import { onEnd } from './onEnd.event.js';
import { onError } from './onError.event.js';

const onConnection = (client) => {
  const connectedClient = client.getConnectedToDistributorClient();
  connectedClient.on('data', onData(client));
  connectedClient.on('end', onEnd(client));
  connectedClient.on('error', onError(client));
};

export default onConnection;
