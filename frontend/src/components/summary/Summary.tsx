/* eslint-disable no-undef */
import './Summary.css';
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Image, ListSongs } from '../../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getGamePoints, getPlaylistId, getGameTracks } from '../../state/game/selectors';
import { useHttpClient } from '../../hooks';
import { getUserInfo } from '../../state/user/selectors';
import { PlayListTypes, TrackType } from '../../state/playList/types';
import { getPlaylistData } from '../../state/playList/selectors/index';
import { groupBy } from 'lodash';

export const Summary: FunctionComponent = (): ReactElement => {
  const gameScores = useSelector(getGamePoints);
  const playlistId = useSelector(getPlaylistId);
  const songs = useSelector(getGameTracks);
  const user = useSelector(getUserInfo);
  const playListData: PlayListTypes = useSelector(getPlaylistData);
  const { sendRequest } = useHttpClient();

  const tracks: TrackType[] = playListData[playlistId]?.tracks;
  const [message, setMessage] = useState<string>('');
  const [scores, setScores] = useState({});
  const playlist = scores[playlistId];


  useEffect(() => {
    const fetchScores = async (): Promise<void> => {
      try {
        const responseData = await sendRequest(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/score/${user.userId}`);

        setScores(groupBy(responseData.scores, 'playlistId'));
      } catch (err) {
        console.warn(`cannot find user's scores, `, err.message);
      }
    };
    fetchScores();
  }, [sendRequest]);

  useEffect((): void => {
    const recordScores = async (): Promise<void> => {
      try {
        await sendRequest(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/score/record`,
          'POST',
          JSON.stringify({
            points: gameScores,
            userId: user.userId,
            playlistId,
          }),
          {
            'Content-Type': 'application/json',
          },
        );
      } catch (err) {
        console.warn(`cannot record scores, `, err.message);
      }
    };

    const updateScores = async (): Promise<void> => {
      try {
        await sendRequest(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/score/update`,
          'PATCH',
          JSON.stringify({
            score: gameScores,
            playlistId,
          }),
          {
            'Content-Type': 'application/json',
          },
        );
      } catch (err) {
        console.warn(`cannot update scores, `, err.message);
      }
    };
    setMessage('');
    if (gameScores && scores) {
      if (!playlist) {
        setMessage('Your new game with the playlist!');
        recordScores();
      } else if (playlist[0].points < gameScores) {
        setMessage("Congratulations, you've beaten your record!");
        updateScores();
      } else if (playlist[0].points >= gameScores) {
        setMessage("It's not your best record!");
      }
    }
  }, [playlist, songs, gameScores, scores]);

  return (
    <div className="summary container">
      <div className="flex pt-10 pt-10 w-full justify-center flex-col md:flex-row">
        <div className="order-2 md:order-1">
          <ListSongs />
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <h2 className="text-4xl text-pink-600 font-albaSuper mb-10">Game Over</h2>
          <span className="font-OpenSans text-light-gray text-sm opacity-50">{message}</span>
          <span className="text-lg text-orange-400">Your score is</span>
          <div className="summary_score">
            <span>{gameScores}</span>
          </div>
          <Image src={require('../../assets/images/svg/medal-icon.svg')} size="medium" alt="medal" />
          <Link
            to={{ pathname: `/game/${playlistId}`, state: { songs, tracks } }}
            className="btn--game max-w-xl bg-transparent focus:outline-none hover:bg-orange-500 text-orange-500 font-semibold hover:text-indigo-900 py-2 border border-orange-500 hover:border-transparent rounded m-1 mt-4 pl-4 pr-4"
          >
            replay game
          </Link>
        </div>
      </div>
    </div>
  );
};
