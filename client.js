// 테스트를 위한 클라이언트
import net from 'net';
import fs from 'fs';
import path from 'path';
import protobuf from 'protobufjs';
import { fileURLToPath } from 'url';
import { packetNames } from './packages/common/constants/packet.js';
import { CLIENT_PACKET_MAPS } from './packages/common/constants/packet.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const protoDir = path.join(__dirname, './packages/common/protobufs');

// 모든 프로토버프 파일을 읽는 함수
export const GetAllProtoFiles = (dir, fileList = []) => {
  // 1. dir에 있는 모든 경로를 읽음.
  const files = fs.readdirSync(dir);

  // 2. 파일들을 순회
  files.forEach((file) => {
    // 3. 파일경로를 저장
    const filePath = path.join(dir, file);

    // 4. 파일이 폴더라면 재귀하여 안에 폴더를 한번 더 확인
    if (fs.statSync(filePath).isDirectory()) {
      GetAllProtoFiles(filePath, fileList);
    }

    // 5. 일반 파일이라면 .proto 확장자만 찾아서 검색
    else if (path.extname(file) === '.proto') {
      // 6. 해당 파일을 fileList에 추가
      fileList.push(filePath);
    }
  });

  return fileList;
};

const protoFiles = GetAllProtoFiles(protoDir);

const protoMessages = {};

export const LoadProtos = async () => {
  try {
    const root = new protobuf.Root();

    await Promise.all(protoFiles.map((file) => root.load(file)));

    for (const [packageName, types] of Object.entries(packetNames)) {
      console.log(packageName, types);
      protoMessages[packageName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[packageName][type] = root.lookupType(typeName);
      }
    }
    console.log('proto 파일 로드 완료.');
  } catch (err) {
    console.error(`Protobuf 파일 로드 중 오류 발생 : ${err}`);
  }
};

await LoadProtos();

const CLIENT_PACKET = {
  account: {
    CreateUserRequest: 14,
    CreateUserResponse: 15,
    LoginRequest: 16,
    LoginResponse: 17, // 응답 성공하면 로비에 진입
  },
};

console.log(protoMessages);

const header = {
  totalHeaderLengthExceptVersion: 11,
  typeLength: 2,
  versionLength: 1,
  sequenceLength: 4,
  payloadLength: 4,
};

const gateOptions = {
  host: '0.0.0.0',
  port: 6300,
};

let sequence = 1;
const createPacket = (packetType, payload) => {
  const packetTypeBuffer = Buffer.alloc(2);
  packetTypeBuffer.writeUInt16BE(packetType, 0);
  const version = '1.0.0';
  const versionLengthBuffer = Buffer.alloc(1);
  versionLengthBuffer.writeUInt8(version.length, 0);
  const versionBuffer = Buffer.from(version, 'utf-8');
  const sequenceBuffer = Buffer.alloc(4);
  sequenceBuffer.writeUInt32BE(sequence, 0);

  const gamePacket = protoMessages.common.GamePacket;
  const packet = {};
  packet[CLIENT_PACKET_MAPS[packetType]] = payload;

  const payloadBuffer = gamePacket.encode(packet).finish();
  const payloadLengthBuffer = Buffer.alloc(4);

  payloadLengthBuffer.writeUInt32BE(payloadBuffer.length, 0);
  console.log(payloadBuffer);

  return Buffer.concat([
    packetTypeBuffer,
    versionLengthBuffer,
    versionBuffer,
    sequenceBuffer,
    payloadLengthBuffer,
    payloadBuffer,
  ]);
};

const client = net.connect(gateOptions, () => {
  console.log('연결 완료');
});

// 데이터 수신 처리
client.on('data', (data) => {
  console.log('받은 데이터: ', data);
});

// 연결 종료 처리
client.on('end', () => {});

// 에러 처리
client.on('error', (err) => {});

// 로그인 요청 확인
const loginData = {
  id: '1234',
  password: '5678',
};

const loginReqBuffer = createPacket(
  CLIENT_PACKET.account.LoginRequest,
  loginData,
);

console.log(loginReqBuffer);

client.write(loginReqBuffer);
