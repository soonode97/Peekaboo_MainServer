// 패킷 타입에 따른 프록시를 지정해주는 파일, 서버가 실행될 때 작동

import { PACKET_TYPE } from '../../../constants/header.js';
import proxy from '../classes/managers/proxyManager.js';

export const loadProxyPacketType = async () => {
  const proxyToLobbyPacket = [
    PACKET_TYPE.EnterWaitingRoomRequest, // 대기실 진입 요청
    PACKET_TYPE.EnterWaitingRoomResponse, // 대기실 진입 성공 시 응답, 대기방 목록 리스트 보냄
    PACKET_TYPE.RefreshWaitingRoomRequest, // 대기실 새로고침 요청
    PACKET_TYPE.RefreshWaitingRoomResponse, // 대기실 새로고침 응답
    PACKET_TYPE.FilterRoomByHostUserRequest, // 대기실 호스트 유저 필터 요청
    PACKET_TYPE.FilterRoomByHostUserResponse, // 대기실 호스트 유저 필터 응답, 해당 유저의 대기방 정보 보냄
    PACKET_TYPE.CreateWaitingRoomRequest, // 대기방 생성 요청
    PACKET_TYPE.CreateWaitingRoomNotification, // 대기방 생성 응답 (전체 클라, 단 로비 서버에 접속해있는 유저만)
    PACKET_TYPE.JoinWaitingRoomRequest, // 대기방 참가 요청
    PACKET_TYPE.JoinWaitingRoomResponse, // 대기방 참가 응답, 해당 대기방에 속한 유저 정보 보냄
    PACKET_TYPE.PrepareStartRequest, // 대기방 게임 시작 준비 요청
    PACKET_TYPE.PrepareStartResponse, // 대기방 게임 시작 준비 응답
    PACKET_TYPE.StartGameFromRoomRequest, // 대기방 게임 시작 요청
    PACKET_TYPE.StartGameFromRoomNotification, // 대기방 게임 시작 응답 (전체 클라)
    PACKET_TYPE.DisconnectWaitingRoomRequest, // 대기방 연결 종료 요청
    PACKET_TYPE.DisconnectWaitingRoomResponse, // 대기방 연결 종료 응답
  ];

  const proxyToMainPacket = [];

  proxyToMainPacket.forEach;

  // 로비 프록시 설정
  proxyToLobbyPacket.forEach((packetType) => {
    proxy.registerProxyServer(packetType, 2);
  });
};
