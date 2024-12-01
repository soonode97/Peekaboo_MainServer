export const createServiceNotificationHandler = async (server, data) => {
  if (server.context.name === 'gateway') {
    server.onDistribute(data.microservices);
  }

  console.log('Distributor data: ', data);
};
