import { getUserInfo } from '../../state/user/selectors';
import { useSelector } from 'react-redux';
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks';
import { groupBy } from 'lodash';
import { PlaylistItem } from '../../components';
import { PlayListTypes } from '../../state/playList/types';

import CircularProgress from '@material-ui/core/CircularProgress';

export const Scores: FunctionComponent = (): ReactElement => {
  const user = useSelector(getUserInfo);
  const [scores, setScores] = useState({});
  const { sendRequest, isLoading } = useHttpClient();

  useEffect((): void => {
    const fetchScores = async (): Promise<void> => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/score/${user.userId}`);
        setScores(groupBy(responseData.scores, 'playlistId'));
      } catch (err) {
        console.warn("cannot find user's scores", err.message);
      }
    };
    fetchScores();
  }, [sendRequest]);

  const playlistIds: string[] = Object.keys(scores);
  const playlistItems = playlistIds?.reduce((acc: PlayListTypes[], id: string): PlayListTypes[] => {
    return [
      ...acc,
      {
        [id]: { name: scores[id][0]?.playlistName, image: scores[id][0]?.playlistImage, tracks: scores[id][0]?.tracks },
      },
    ];
  }, []);

  const totalScores = playlistIds?.reduce((acc: number, id: string) => {
    return acc + scores[id][0]['points'];
  }, 0);

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
      <div className="flex w-full w-full flex-wrap">
        {!playlistItems.length && (
          <h3 className="font-alba text-orange-500 text-3xl mt-10">You don&apos;t have any games records yet</h3>
        )}
        {playlistItems?.map((playlist: PlayListTypes, index: number) => {
          const id = Object.keys(playlist)[0];
          const date = scores[id][0].date;
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const name = playlist[id].name;
          const dateFormatted = new Date(date).toLocaleDateString(undefined, options);
          return (
            <div className="w-full md:w-1/3 min-w-64 flex" key={index}>
              <div className="w-1/3 max-w-24">
                <PlaylistItem playlist={playlist} />
              </div>
              <div className="w-2/3 pl-4 pt-6">
                <h3 className="font-alba text-orange-500 text-xl -mb-2">
                  {name.length > 15 ? `${name.slice(0, 15)}...` : name}
                </h3>
                <span className="font-OpenSans text-light-gray text-xs opacity-50">{dateFormatted}</span>
                <p className="font-albaSuper text-jellyBean text-2xl">{scores[id][0].points} p.</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
