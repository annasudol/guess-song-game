import './Game.css';
import { Button, PointsInfo, Timer, Alert } from '../../components';
import { Redirect, useParams, useLocation } from 'react-router';
import { TrackType } from '../../state/playList/types';
import { shuffle } from '../../utils/shuffle';
import { useReducerGame, useTimer } from '../../hooks';
import { useDispatch } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import cx from 'classnames';
import { LocationTypes } from '../../utils';
import { AppRoutes } from '../../config/routes';
import { updateGameInfo } from '../../state/game/actions';

interface SongTypes {
  goodAnswer: string;
  bad9Answers: string[];
  url: string;
  gameSongs: TrackType[];
}

export const Game: React.FunctionComponent = () => {
  const { playlistID } = useParams<{playlistID: string}>();
  const location: LocationTypes = useLocation();
  const gameSongs: TrackType[] = location?.state.songs;
  const tracks: TrackType[] = location?.state.tracks;
  const { elapsedTime, startTimer, resetTimer, endTimer } = useTimer();
  const { songIndex, end, totalScore, dispatch } = useReducerGame();
  const dispatchToState = useDispatch();
  const [currentPoints, setCurrentPoints] = useState<number>(0);
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    startTimer();
    if (elapsedTime >= 30) {
      if (songIndex < 9) {
        dispatch({ TYPE: 'CHANGE_POINTS', setPoints: -10 });
        dispatch({ TYPE: 'INCREASE_INDEX' });
        resetTimer();
      } else {
        endTimer();
        dispatchToState(updateGameInfo(playlistID, totalScore, gameSongs));
        dispatch({ TYPE: 'END_GAME' });
      }
    }
  }, [elapsedTime, songIndex]);

  const song = useMemo((): SongTypes => {
    if (tracks) {
      const url: string = gameSongs[songIndex].songUrl;
      const goodAnswer: string = gameSongs[songIndex].title;
      const bad9Answers: string[] = shuffle([...tracks]).reduce((acc: string[], item: TrackType) => {
        return item.title !== goodAnswer && acc.length < 9 && !acc.includes(item.title)
          ? [...acc, item.title]
          : [...acc];
      }, []);
      return { bad9Answers, gameSongs, goodAnswer, url };
    }

    return {
      bad9Answers: [],
      goodAnswer: '',
      gameSongs: [],
      url: '',
    };
  }, [playlistID, songIndex, gameSongs]);

  const checkAnswer = (value: string): void => {
    if (value !== song.goodAnswer) {
      setAlert(true);
      dispatch({ TYPE: 'CHANGE_POINTS', setPoints: -10 });
      setCurrentPoints(-10);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }

    if (value === song.goodAnswer) {
      let points;
      if (elapsedTime <= 5) {
        points = 30;
      } else if (elapsedTime <= 10) {
        points = 20;
      } else if (elapsedTime <= 15) {
        points = 10;
      } else {
        points = 5;
      }
      dispatch({ TYPE: 'CHANGE_POINTS', setPoints: points });
      setCurrentPoints(points);

      if (songIndex < 9) {
        dispatch({ TYPE: 'INCREASE_INDEX' });
        resetTimer();
      } else {
        endTimer();
        dispatchToState(updateGameInfo(playlistID, totalScore, gameSongs));
        dispatch({ TYPE: 'END_GAME' });
      }
    }
  };

  if (end) {
    return <Redirect to={AppRoutes.Summary} />;
  }
const answers: string[] = shuffle([...song.bad9Answers, song.goodAnswer]);
  return (
    <div className="container h-full">
      <div className="flex justify-center h-full items-middle full-width items-center">
        <Timer time={elapsedTime} />
        <PointsInfo songNr={songIndex + 1} totalScore={totalScore} />
        <Alert points={currentPoints} alert={alert} />
      </div>
      <ReactPlayer url={song?.url} stop={end && end.toString()} playing width="0" height="0" />
      <div className="game flex justify-between align-top flex-wrap min-h-64 w-full">
        {answers.map((answer: string, index: number) => (
          <Button
            mainBtn
            key={index}
            value={[answer, song.goodAnswer]}
            className={cx(answer !== song.goodAnswer && 'btn--shake')}
            onClick={(): void => checkAnswer(answer)}
          >
            {answer?.length > 30 ? `${answer.slice(0, 30)}...` : answer}
          </Button>
        ))}
      </div>
    </div>
  );
};
