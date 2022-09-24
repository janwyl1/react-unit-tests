import { useCallback, useState } from 'react';

export default function useTimer(initialValue = 0) {
  const [time, setTime] = useState(initialValue);
  const [intervalId, setIntervalId] = useState();

  const start = useCallback(() => {
    setIntervalId(
      setInterval(() => {
        setTime((x) => x + 1);
      }, 1000)
    );
  });
  const stop = useCallback(() => {
    clearInterval(intervalId);
  });
  const reset = useCallback(() => setTime(initialValue), [initialValue]);
  return { time, start, stop, reset };
}
