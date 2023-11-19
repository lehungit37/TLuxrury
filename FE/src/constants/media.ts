import audioInfo from 'src/assets/audio/notification-sound.mp3';
import audioWarning from 'src/assets/audio/notification-sound-warning.mp3';
import audioInfoDanger from 'src/assets/audio/notification-sound-danger.mp3';
import audio4 from 'src/assets/audio/hangover-sound.mp3';
import audio5 from 'src/assets/audio/ill-make-it-possible-notification.mp3';
import audio6 from 'src/assets/audio/my-work-is-done-message-tone.mp3';
import audio7 from 'src/assets/audio/relax-message-tone.mp3';
import audio8 from 'src/assets/audio/ringtone-you-would-be-glad-to-know.mp3';
import audio9 from 'src/assets/audio/so-proud-notification.mp3';

type TSound = {
  id: string;
  name: string;
  source: string;
};

export const soundList: TSound[] = [
  {
    id: 'OFF',
    name: 'Tắt âm thanh',
    source: '',
  },
  {
    id: 'sound1',
    name: 'Notification-sound-info',
    source: audioInfo,
  },
  {
    id: 'sound2',
    name: 'Notification-sound-warning',
    source: audioWarning,
  },
  {
    id: 'sound3',
    name: 'Notification-sound-danger',
    source: audioInfoDanger,
  },
  {
    id: 'sound4',
    name: 'Hangover-sound',
    source: audio4,
  },
  {
    id: 'sound5',
    name: 'Make-possible-notification',
    source: audio5,
  },
  {
    id: 'sound6',
    name: 'My-work-done-message-tone',
    source: audio6,
  },
  {
    id: 'sound7',
    name: 'Relax-message-tone',
    source: audio7,
  },
  {
    id: 'sound8',
    name: 'Ringtone-success',
    source: audio8,
  },
  {
    id: 'sound9',
    name: 'So-proud-notification',
    source: audio9,
  },
];
