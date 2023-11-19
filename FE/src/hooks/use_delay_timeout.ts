import React, { useState } from 'react';

export const useDelayTimeout = (timeout = 1025) => {
  const [delay, setDelay] = useState<NodeJS.Timeout | null>(null);

  const delayTimeout = (callback: () => void, ms = timeout) => {
    if (delay) {
      clearTimeout(delay);
    }

    const dl = setTimeout(() => callback(), ms);

    setDelay(dl);
  };

  React.useEffect(() => {
    return () => {
      if (delay) {
        clearTimeout(delay);
      }
    };
  }, []);

  return delayTimeout;
};
