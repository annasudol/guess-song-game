import { getUserInfo, getToken } from '../../state/user/selectors';
import { useSelector } from 'react-redux';
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks';
import { ScoresItems } from '../../components';



import CircularProgress from '@material-ui/core/CircularProgress';

export interface ScoresDBProps {
  date: string;
  _id: string;
  points: number
  playlistId: string;
  creator: string;

}

export interface ScoresDBPropsGrouped {
  [playlistId: string]: {
    date: string;
    points: number;
  }
}

export const Scores: FunctionComponent = (): ReactElement => {
  const user = useSelector(getUserInfo);
  const [scores, setScores] = useState<ScoresDBProps[]>([]);
  const { sendRequest, isLoading } = useHttpClient();

  useEffect((): void => {
    const fetchScores = async (): Promise<void> => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/score/${user.userId}`);
        setScores(responseData.scores);
      } catch (err) {
        console.warn("cannot find user's scores", err.message);
      }
    };
    fetchScores();

  }, [sendRequest]);

  const scoresGrouped = scores?.reduce((acc: ScoresDBPropsGrouped[], item: ScoresDBProps) => {
    return [...acc, {
      [item.playlistId]: {
        points: item.points,
        date: item.date,
      }
    }]
  }, []);


  const totalScores = scoresGrouped?.reduce((acc: number, item: ScoresDBPropsGrouped) => {
    return acc + Object.values(item)[0].points;
  }, 0);

  const playlistIds = scoresGrouped.reduce((acc: string[], item: ScoresDBPropsGrouped) => {
    return [...acc, ...Object.keys(item)]
  }, [])


  if (isLoading) {
    return (
      <div className="container flex justify-center items-center full-width h-full mt-20">
        <CircularProgress size={100} color="secondary" />
      </div>
    );
  }

  return (
    <div className="container pt-10">
      <div className="flex justify-between align-top full-width">
        <h2 className="font-albaSuper text-jellyBean self-top text-2xl">hello {user.name}!</h2>
        <div className="flex justify-end w-2/5">
          <div className="text-right mr-4">
            <h2 className="font-alba text-jellyBean text-3xl -mb-2">{playlistIds?.length ? playlistIds?.length : 0}</h2>
            <p className="font-OpenSans text-light-gray text-xs opacity-50">Total Games</p>
          </div>
          <div className="text-right">
            <h2 className="font-alba text-jellyBean text-3xl -mb-2">{totalScores}</h2>
            <p className="font-OpenSans text-light-gray text-xs opacity-50">Total Points</p>
          </div>
        </div>
      </div>
      <ScoresItems playlistIds={playlistIds} scoresDB={scoresGrouped} />
    </div>
  );
};


