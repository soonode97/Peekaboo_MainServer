import Redis from 'ioredis';
import config from '../../config/shared/index.js';

class RedisManager {
  constructor() {
    if (!RedisManager.instance) {
      this.publisherClient = new Redis({
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
        retryStrategy: (times) => Math.min(times * 100, 2000),
      });

      this.subscriberClient = new Redis({
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
        retryStrategy: (times) => Math.min(times * 100, 2000),
      });

      // get, set, hset, hget 등 일반적인 명령어 수행을 위한 클라이언트
      this.client = new Redis({
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
        retryStrategy: (times) => Math.min(times * 100, 2000),
      });

      // Redis 연결 및 에러 핸들링
      // this.publisherClient.on('error', (error) =>
      //   console.error('Redis Publisher Error:', error),
      // );
      // this.subscriberClient.on('error', (error) =>
      //   console.error('Redis Subscriber Error:', error),
      // );

      // this.publisherClient.on('connect', () =>
      //   console.log('Connected to Redis Publisher'),
      // );
      // this.subscriberClient.on('connect', () =>
      //   console.log('Connected to Redis Subscriber'),
      // );

      // this.client.on('error', (error) => console.error('Redis Error:', error));
      // this.client.on('connect', () => console.log('Connected to Redis Cloud'));
      // this.publisherClient.on('reconnecting', (times) =>
      //   console.log(`Redis Publisher reconnecting... Attempt: ${times}`),
      // );
      // this.subscriberClient.on('reconnecting', (times) =>
      //   console.log(`Redis Subscriber reconnecting... Attempt: ${times}`),
      // );

      setupClientEvents(this.publisherClient, 'Publisher');
      setupClientEvents(this.subscriberClient, 'Subscriber');
      setupClientEvents(this.client, 'Default');

      RedisManager.instance = this;
    }
    return RedisManager.instance;
  }

  getClient() {
    return this.client;
  }

  getPublisherClient() {
    return this.publisherClient;
  }

  getSubscriberClient() {
    return this.subscriberClient;
  }
}

const setupClientEvents = (client, type) => {
  client.on('error', (error) => console.error(`Redis ${type} Error:`, error));
  client.on('connect', () => console.log(`Connected to Redis ${type}`));
  client.on('reconnecting', (times) =>
    console.log(`Redis ${type} reconnecting... Attempt: ${times}`),
  );
};

export default RedisManager;
