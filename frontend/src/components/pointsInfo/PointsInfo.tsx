import './PointsInfo.css';
import React, { FunctionComponent, ReactElement } from 'react';

export interface PointsInfoProps {
  totalScore: number;
  songNr: number;
}
export const PointsInfo: FunctionComponent<PointsInfoProps> = ({ totalScore, songNr }): ReactElement => (
  <div className="score">
    <div className="score-item">
      <span>song</span>
      {songNr} / 10
    </div>
    <div className="score-item">{totalScore}</div>
  </div>
)

export const PointsInfoMemorized = React.memo(PointsInfo);
