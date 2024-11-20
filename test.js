class User {
  constructor(id, socket) {
    // 유저 기본 정보
    this.id = id;
    this.socket = socket;
    this.state = 1;

    // 게임을 할때만 사용할 인스턴스가 필요!
    this.character = null;

    delete this.character;
  }
}

class Character extends User {
  constructor(id, socket) {
    super(id, socket);
    // 게임 정보
    this.gameId = null;
    this.position = 222;
    this.rotation = 333;
    this.hp = 1;
    this.state = 2;
  }
}

class Game {
  constructor(id) {
    this.id = id;
    this.hostId = null;
    this.users = [];
    this.ghosts = [];
    this.state = 10;
  }
}

const userSessions = [];

const user = new User('id', 'socket');

userSessions.push(user);

const gameSession = new Game('gameId11');

const character = new Character(user.id, user.socket);

gameSession.users.push(character);
console.log('------- 게임 세션이 생성되고 유저와 캐릭터 -------');

console.log(user);
console.log(character);

gameSession.users.shift();

console.log('------- 게임 세션이 삭제되고 유저와 유저 세션 -------');

console.log(userSessions);
