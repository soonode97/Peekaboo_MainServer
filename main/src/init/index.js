import { testAllDBConnection } from '../database/mysql/execute/commands/test.command.js';
import redis from '../classes/managers/redisManager.js';

const initServer = async () => {
  try {
    testAllDBConnection();
    if (!redis) {
      console.error(`Error from Redis Connection`);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default initServer;
