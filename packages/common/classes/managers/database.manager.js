import mysql from 'mysql2/promise';
import config from '../../config/shared/index.js';
import { formatDate } from '../../utils/format/date.format.js';

class DatabaseManager {
  static gInstance = null;
  pools = {};

  constructor() {
    const { databases } = config;

    this.createPool('USER_DB', databases.USER_DB);
    this.createPool('GAME_DB', databases.GAME_DB);
  }

  static GetInstance() {
    if (DatabaseManager.gInstance === null) {
      DatabaseManager.gInstance = new DatabaseManager();
    }

    return DatabaseManager.gInstance;
  }

  createPool(poolName, dbConfig) {
    const pool = mysql.createPool({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.name,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const originalQuery = pool.query;

    pool.query = async (sql, params) => {
      const date = new Date();
      console.log(
        `[${formatDate(date)}] Executing query: ${sql} ${
          params ? `, ${JSON.stringify(params)}` : ``
        }`,
      );

      const result = await originalQuery.call(pool, sql, params);
      return result;
    };

    this.pools[poolName] = pool;
  }
}
export default DatabaseManager.GetInstance();
