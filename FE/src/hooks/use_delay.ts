import { useState } from 'react';

export const useDelayTimeout = (timeout = 1000) => {
  const [delay, setDelay] = useState<NodeJS.Timeout | null>(null);

  const delayTimeout = (callback: () => void, ms = timeout) => {
    if (delay) {
      clearTimeout(delay);
    }

    const dl = setTimeout(() => callback(), ms);

    setDelay(dl);
  };

  return delayTimeout;
};
