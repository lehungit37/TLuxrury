import { ECameraStatus } from './enum';

export interface IStream {
  id?: string;
  index: number;
  group: string;
  inFollowlist?: boolean;
  mainStream?: string;
  subStream?: string;
  name: string;
  status: number;
  cameraId: string;
  description?: string;
}

export interface IStreamDataCreate {
  cameraId: string;
  position: number;
}

export interface IStreamCreate {
  groupId: string;
  data: IStreamDataCreate;
}

export interface IRtcStream {
  classifiedListId: string;
  position: number;
  camera: {
    name: string;
    status: ECameraStatus;
    id: string;
    subStream?: string;
    mainStream: string;
  };
}

export interface IStreamFormToolbar {
  page: number;
  listSize: number;
  // time: Date | string;
  // mode: { id: TStreamMode; name: string };
  groupId: string;
  // group: { id: string; name: string };
  // speed: { id: string; name: string };
}

export interface IStreamFormToolbarFromURL {
  page: number;
  listSize: number;
  time: string;
  mode: string;
  groupId: string;
  speed: string;
}

export interface IStreamFilterRequest {
  groupId: string;
  page: number;
  listSize: number;
  time?: Date | string;
}

export interface IStreamFilterResponse {
  page: number;
  totalPage: number;
  data: IRtcStream[];
}

export type TStreamMode = 'live' | 'playback';
