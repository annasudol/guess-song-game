import './ScoreInfo.css';
import React, { FunctionComponent, ReactElement } from 'react';

export interface ScoreInfoProps {
  totalScore: number;
  songNr: number;
}
export const ScoreInfo: FunctionComponent<ScoreInfoProps> = ({ totalScore, songNr }): ReactElement => (
  <div className="score">
    <div className="score-item">
      <span>song</span>
      {songNr} / 10
    </div>
    <div className="score-item">{totalScore}</div>
  </div>
);
