// 테스트를 위한 클라이언트
import net from 'net';
import fs from 'fs';
import path from 'path';
import protobuf from 'protobufjs';
import { fileURLToPath } from 'url';
import { CLIENT_PACKET_MAPS } from './packages/modules/constants/packet/client.packet.js';
import { CLIENT_PACKET } from './packages/modules/constants/packet/client.packet.js';

export const packetNames = {
  common: {
    GamePacket: 'common.GamePacket',
    ServicePacket: 'common.ServicePacket',
  },
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const protoDir = path.join(__dirname, './packages/modules/protobufs');

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

const header = {
  totalHeaderLengthExceptVersion: 11,
  typeLength: 2,
  versionLength: 1,
  sequenceLength: 4,
  payloadLength: 4,
};

const gateOptions = {
  host: '0.0.0.0',
  port: 6000,
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

  console.log(packet);

  const payloadBuffer = gamePacket.encode(packet).finish();
  const payloadLengthBuffer = Buffer.alloc(4);

  payloadLengthBuffer.writeUInt32BE(payloadBuffer.length);
  console.log('페이로드: ', payloadBuffer);
  console.log('만든 페이로드의 길이: ', payloadLengthBuffer);

  return Buffer.concat([
    packetTypeBuffer,
    versionLengthBuffer,
    versionBuffer,
    sequenceBuffer,
    payloadLengthBuffer,
    payloadBuffer,
  ]);
};

const parsePacket = (payload) => {
  const packet = protoMessages.common.GamePacket;

  let payloadData;
  try {
    payloadData = packet.decode(payload);
  } catch (e) {
    console.error(e);
  }

  for (const key in payloadData) {
    if (
      payloadData.hasOwnProperty(key) &&
      typeof payloadData[key] === 'object'
    ) {
      return {
        payload: payloadData[key],
      };
    }
  }
};

const client = net.connect(gateOptions, () => {
  console.log('연결 완료');
});

// 데이터 수신 처리
client.on('data', (data) => {
  console.log('받은 데이터: ', data);

  let offset = 0;
  const packetType = data.readUint16BE(offset);
  offset += 2;

  const versionLength = data.readUint8(offset);
  offset += 1;

  const version = data
    .subarray(offset, offset + versionLength)
    .toString('utf-8');
  offset += versionLength;

  const sequence = data.readUint32BE(offset);
  offset += 4;

  const payloadLength = data.readUint32BE(offset);
  offset += 4;

  const payloadBuffer = data.subarray(offset, offset + payloadLength);
  offset += payloadLength;
  console.log(`packetType: ${packetType}`);
  console.log(`versionLength: ${versionLength}`);
  console.log(`sequence: ${sequence}`);
  console.log(`payloadLength: ${payloadLength}`);
  console.log(`payloadBuffer: `, payloadBuffer);
  const payload = parsePacket(payloadBuffer);
  console.log(`payload: `, JSON.stringify(payload));
});

// 연결 종료 처리
client.on('end', () => {});

// 에러 처리
client.on('error', (err) => {});

// 로그인 요청 확인
const loginData = {
  id: 'test6',
  password: '1234',
};

const loginReqBuffer = createPacket(
  CLIENT_PACKET.account.LoginRequest,
  loginData,
);

const enterLobbyData = {
  userId: 'e3e3962d-795d-4428-8c60-d00bedb08149',
};

const enterLobbyReqBuffer = createPacket(
  CLIENT_PACKET.lobby.EnterLobbyRequest,
  enterLobbyData,
);

console.log(loginReqBuffer);
client.write(loginReqBuffer);

setTimeout(() => {
  client.write(enterLobbyReqBuffer);
}, 5000);
