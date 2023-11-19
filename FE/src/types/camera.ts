import { ReactNode } from 'react';
import { ECameraStatus } from './enum';

export interface IRTSPLink {
  name: string;
  rtspLink: string;
}

export interface IStream {
  name: string;
  token: string;
  resolution: { width: number; height: number };
  resolutionRange: { width: number; height: number }[];
  quality: number;
  qualityRange: number[];
  fps: number;
  fpsRange: number[];
}

export interface ICameraSearch {
  searchKeyword?: string;
  station?: string;
  page?: number;
  limit?: number;
}

export interface ICameraItemProps {
  camera: ICamera;
  children?: ReactNode;
  isDrag?: boolean;
  icon?: ReactNode;
  selectedId?: string;
  isStation?: boolean;
  selectCamera?: (camera: ICamera) => void;
}

export interface ICamera {
  id: string;
  name: string;
  stationId: string;
  rtspLink: string;
  stationName: string;
  isSharedLink: boolean;
  isSupportPtz: boolean;
  functionEnabled: boolean;
  status: ECameraStatus;
  subStream?: string;
  mainStream?: string;
  address?: string;
  lat?: number;
  lng?: number;
}

export type TCameraStatus =
  | ECameraStatus.NORMAL
  | ECameraStatus.ERROR
  | ECameraStatus.OFFLINE
  | ECameraStatus.WARNING;

export interface ICameraConnect {
  name: string;
  stationId: string;
  isSharedLink: boolean;
  rtspLinks: IRTSPLink[];
  ip: string;
  user: string;
  pass: string;
  portOnvif: string;
  portRtsp: string;
}

export interface ICameraParams {
  fps: number;
  fpsRange: { Min: number | string; Max: number | string };
  name: string;
  quality: number;
  qualityRange: { Min: number | string; Max: number | string };
  resolution: { width: number; height: number };
  resolutionRange: { width: number; height: number }[];
  token: string;
}

export interface ICameraFunction {
  functionEnabled: boolean;
  isStream: boolean;
  isRecord: boolean;
  streamEnabled: IStream | null;
  recordEnabled: IStream | null;
  streams: IStream[];
}

export interface ICameraLogs {
  id: string;
  level: string,
  time: Date,
  title: {
    content: string,
    data: {
      cameraName: string;
    }
  }
}
