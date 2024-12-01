export class User {
  constructor(id, clientKey) {
    this.id = id;
    this.host = clientKey.host;
    this.port = clientKey.port;
  }
}
