import dotenv from 'dotenv';

dotenv.config();

// MAIN SERVER
export const SERVER_HOST = process.env.SERVER_HOST || '0.0.0.0';
export const MAIN_NET_PORT = process.env.MAIN_NET_PORT || '6666';
export const LOBBY_NET_PORT = process.env.LOBBY_NET_PORT || '6667';
export const CLIENT_VERSION = process.env.CLIENT_VERSION || '1.0.0';

// DB SERVER
export const DB1_NAME = process.env.DB1_NAME || 'PEEKABOO_USER_DB';
export const DB2_NAME = process.env.DB2_NAME || 'PEEKABOO_GAME_DB';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || null;
export const DB_HOST = process.env.DB_HOST || '127.0.0.1';
export const DB_PORT = process.env.DB_PORT || '5000';

// AUTHENTICATION
export const SECRET_KEY = process.env.SECRET_KEY;
