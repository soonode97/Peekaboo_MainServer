import redisManager from '@peekaboo-ssr/classes/RedisManager';

export const publishToChannel = async (channel, message) => {
  try {
    await redisManager.publish(channel, JSON.stringify(message));
    console.log(`Published to channel ${channel}: `, message);
  } catch (e) {
    console.error('Publish Error: ', e);
  }
};
