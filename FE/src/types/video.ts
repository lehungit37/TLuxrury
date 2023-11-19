export interface IVideoHlsBody {
  cameraId: string;
  date: Date;
}

export interface IVideoHls {
  camera: string;
  end: Date;
  id: string;
  name: string;
  path: string;
  size: number;
  start: Date;
  status: number;
  ms?: number;
  isOvernight?: boolean;
  videoSeekDefault?: number;
  isEndDay?: boolean;
}

export interface IMediaPlayer {
  videoLinks: IVideoHls[];
  date: Date;
  today: Date;
  isPlay: boolean;
  isSeeking: boolean;
  speed: number;
  cameraId: string;
  isRefresh: boolean;
  isLoading: boolean;
}

export interface IShareVideo {
  startDate: string;
  endDate: string;
  cameraId: string;
  eventId?: string;
  linkVideo?: string;
}

export interface IVideoDownload {
  startDate: Date;
  endDate: Date;
  cameraId: string;
  authorization: string;
  user_id: string;
}
