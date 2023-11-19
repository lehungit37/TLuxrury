import { useIsRequestPending } from './use_status';

export const useLoadingCamera = () => {
  const connect = useIsRequestPending('camera', 'getCameraConnect');
  const param = useIsRequestPending('camera', 'getCameraParams');
  const setting = useIsRequestPending('camera', 'getCameraFunction');

  return connect || param || setting;
};
