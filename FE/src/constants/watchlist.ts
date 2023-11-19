// import { IStreamFormToolbar, TStreamMode } from 'src/types/stream';

export const LIST_SIZE = {
  half: 4,
  oneThird: 9,
  quarter: 16,
  fifth: 25,
};

export const isMaximumTotalPage = (totalPage: number, listSize: number) =>
  totalPage === Math.ceil(125 / listSize);

export const MODE_OPTIONS: { id: 'live' | 'playback'; name: string }[] = [
  {
    id: 'live',
    name: 'Trực tiếp',
  },
  {
    id: 'playback',
    name: 'Xem lại',
  },
];

export const SPEED_OPTIONS = [
  {
    id: '0.25',
    name: '0.25X',
  },
  {
    id: '0.5',
    name: '0.5X',
  },
  {
    id: '1.0',
    name: '1X',
  },
  {
    id: '2.0',
    name: '2X',
  },
  {
    id: '3.0',
    name: '3X',
  },
];

export const initStreamFormToolbar = {
  listSize: LIST_SIZE.oneThird,
  page: 1,
  // time: new Date(),
  groupId: 'all',
  // mode: MODE_OPTIONS[0],
  // speed: SPEED_OPTIONS[2],
};
