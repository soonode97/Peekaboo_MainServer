import { sessions } from '../../sessions/sessions.js';

export const joinSessionByType = (type, userData) => {
  // 만약 해당 타입의 세션이 아직 아무것도 없다면 타입 세션을 만듦
  if (!sessions[type]) {
    sessions[type] = [];

    sessions[type].push(userData);
  } else {
    // 존재한다면 해당 유저가 이미 세션에 가입되어 있는지 확인
    const user = sessions[type].find((user) => user.uuid === userData.uuid);
    // 유저가 없다면 해당 세션에 추가
    if (!user) {
      sessions[type].push(userData);
    }
  }
  console.log(sessions);
};
