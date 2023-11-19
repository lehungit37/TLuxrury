export const PtzControlOptions = {
  slow: {
    pan: {
      right: '0.2',
      left: '-0.2',
      default: '0.0',
      loopRight: '0.2',
      loopLeft: '-0.2',
    },
    tilt: {
      up: '0.2',
      down: '-0.2',
      default: '0.0',
    },
    zoom: {
      in: '0.02',
      out: '-0.02',
      default: '0.0',
    },
  },
  default: {
    pan: {
      right: '0.5',
      left: '-0.5',
      default: '0.0',
      loopRight: '0.5',
      loopLeft: '-0.5',
    },
    tilt: {
      up: '0.5',
      down: '-0.5',
      default: '0.0',
    },
    zoom: {
      in: '0.05',
      out: '-0.05',
      default: '0.0',
    },
  },
  fast: {
    pan: {
      right: '0.8',
      left: '-0.8',
      default: '0.0',
      loopRight: '0.8',
      loopLeft: '-0.8',
    },
    tilt: {
      up: '0.8',
      down: '-0.8',
      default: '0.0',
    },
    zoom: {
      in: '0.08',
      out: '-0.08',
      default: '0.0',
    },
  },
};

export const ptzSpeedOs = [
  {
    type: 'slow',
    title: 'Chậm',
    color: 'secondary',
    speed: '0.5',
    speedOs: PtzControlOptions.slow,
  },
  {
    type: 'default',
    title: 'Vừa',
    color: 'default',
    speed: '1',
    speedOs: PtzControlOptions.default,
  },
  {
    type: 'fast',
    title: 'Nhanh',
    color: 'primary',
    speed: '1.5',
    speedOs: PtzControlOptions.fast,
  },
];
