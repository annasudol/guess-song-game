import { AppThunk } from '../../store';
import { GAME } from '../constants';
import { createAction } from '@reduxjs/toolkit';
import { TrackType } from '../../playList/types';

export const actionGameInfoUpdate = createAction(
  GAME.UPDATE,
  (game: { playlistId: string; score: number; tracks: TrackType[] }) => ({
    payload: game,
  }),
);

export const actionGameResetUpdate = createAction(GAME.RESET);

export function updateGameInfo(playlistId: string, score: number, tracks: TrackType[]): AppThunk {
  return async (dispatch): Promise<void> => {
    try {
      dispatch(
        actionGameInfoUpdate({
          playlistId,
          score,
          tracks,
        }),
      );
    } catch (error) {
      console.warn('problem with login user', error);
    }
  };
}

export function resetGameInfo(): AppThunk {
  return (dispatch): void => {
    dispatch(actionGameResetUpdate());
  };
}
