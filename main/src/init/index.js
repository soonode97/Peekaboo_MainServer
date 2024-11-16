import { testAllDBConnection } from '../database/mysql/execute/commands/test.command.js';

const initServer = async () => {
  testAllDBConnection();
  try {
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default initServer;
