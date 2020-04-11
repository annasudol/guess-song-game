import { useEffect, useState } from 'react';

interface TimerProps {
  elapsedTime: number;
  resetTimer: VoidFunction;
  startTimer: VoidFunction;
  endTimer: VoidFunction;
}

export const useTimer = (): TimerProps => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = window.setInterval(() => setElapsedTime(prevElapsedTime => prevElapsedTime + 0.1), 100);
    }

    return (): void => clearInterval(interval);
  }, [isRunning]);

  const handleReset = (): void => {
    setIsRunning(true);
    setElapsedTime(0);
  };

  return {
    elapsedTime: Math.round(elapsedTime),
    endTimer: (): void => setIsRunning(false),
    resetTimer: (): void => handleReset(),
    startTimer: (): void => setIsRunning(true),
  };
};
