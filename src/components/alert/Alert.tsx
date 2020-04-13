import './Alert.css';
import React, { FunctionComponent } from 'react';
import badge from '../../assets/images/svg/badge.svg';

export interface AlertProps {
  alert: boolean;
  points: number;
}

export const Alert: FunctionComponent<AlertProps> = ({ points, alert }) => {
  const badAnswer = (
    <div className="alert--no-points font-alba">
      <p>{points}</p>
    </div>
  );
  const goodAnswer = (
    <div className="alert">
      <div className="alert_info">
        <img src={badge} alt="medal" className="medal" />
        <p className="alert_score font-alba">{points}</p>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {alert && badAnswer}
      {points > 0 && goodAnswer}
    </React.Fragment>
  );
};
