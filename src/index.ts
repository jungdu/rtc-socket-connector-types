import { Socket } from "socket.io"
import {Socket as ClientSocket} from "socket.io-client"

export enum RTCConnectionType {
  OFFER = "OFFER",
  ANSWER = "ANSWER"
}

export interface Room {
  roomId: string;
  createdBy: string;
  roomName: string;
  userSocketIds: string[];
}

interface AnswerData {
  answerSocketId: string;
  answer: RTCSessionDescriptionInit;
  offerSocketId: string;
}

interface CandidateData {
  candidate: RTCIceCandidate;
  destSocketId: string;
  fromSocketId: string;
  type: RTCConnectionType;
}

interface OfferData {
  answerSocketId: string;
  offer: RTCSessionDescriptionInit;
  offerSocketId: string;
  enableDataChannel: boolean;
  enableMediaStream: boolean;
}

type SocketHandler<T extends any[] = []> = (...args: T) => void;

type ClientRTCConnectionMessage = {
  answer: SocketHandler<[msg:AnswerData]>;
  offer: SocketHandler<[msg:OfferData]>;
  candidate: SocketHandler<[msg: CandidateData]>;
}

type ServerRTCConnectionMessage = {
  offer: SocketHandler<[msg:OfferData]>;
  answer: SocketHandler<[msg:AnswerData]>
  candidate: SocketHandler<[msg: CandidateData]>
}

export type RTCClientSocket = ClientSocket<ServerRTCConnectionMessage, ClientRTCConnectionMessage>;

export type RTCServerSocket = Socket<ClientRTCConnectionMessage, ServerRTCConnectionMessage>;