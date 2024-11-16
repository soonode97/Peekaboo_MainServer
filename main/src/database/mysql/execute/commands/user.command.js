import DatabaseManager from '../../../../classes/managers/databaseManager.js';
import { USER_SQL_QUERIES } from '../../queries/user/user.queries.js';

export const findUser = async (id) => {
  const [rows] = await DatabaseManager.pools.USER_DB.query(
    USER_SQL_QUERIES.FIND_USER_BY_USER_ID,
    [id],
  );
  return rows[0];
};

export const createUser = async (id, email, password) => {
  await DatabaseManager.pools.USER_DB.query(USER_SQL_QUERIES.CREATE_USER, [
    id,
    email,
    password,
  ]);
  return { id, email, password };
};

export const updateUserLogin = async (id) => {
  await DatabaseManager.pools.USER_DB.query(
    USER_SQL_QUERIES.UPDATE_USER_LOGIN,
    [id],
  );
};
