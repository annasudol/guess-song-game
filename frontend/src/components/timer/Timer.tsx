import React, { FunctionComponent, ReactElement } from 'react';
import './Timer.css';

interface TimerProps {
  time: number;
}

export const Timer: FunctionComponent<TimerProps> = ({ time }): ReactElement => {
  const remain = time > 20 ? `0${30 - time}` : `${30 - time}`;

  return <div className={`timer ${time > 20 ? 'animated red' : ''}`}> 00 : {remain}</div>;
};
export const TimerMemorized = React.memo(Timer);
