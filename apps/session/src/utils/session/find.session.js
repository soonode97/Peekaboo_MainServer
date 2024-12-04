import { sessions } from '../../sessions/sessions.js';

export const getSessionsByType = (type) => {
  return sessions[type];
};

export const getUserByUUID = (sessions, uuid) => {
  return sessions.find((user) => user.uuid === uuid);
};

export const getUserByClientKey = (sessions, clientKey) => {
  return sessions.find((user) => user.clientKey === clientKey);
};
