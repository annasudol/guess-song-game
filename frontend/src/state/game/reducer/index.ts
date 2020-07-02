import { GameInfoTypes } from '../types';
import { createReducer } from '@reduxjs/toolkit';
import { actionGameInfoUpdate, actionGameResetUpdate } from '../actions';

export const initialState = {
  playlistId: '',
  score: 0,
  tracks: [
    {
      artist: '',
      songUrl: '',
      externalUrl: '',
      title: '',
      img: '',
    },
  ],
};

export const game = createReducer<GameInfoTypes>(initialState, {
  [actionGameInfoUpdate.type]: (state, action) => {
    if (actionGameInfoUpdate.match(action)) {
      return {
        ...state,
        playlistId: action.payload.playlistId,
        score: action.payload.score,
        tracks: action.payload.tracks,
      };
    }
    return state;
  },
  [actionGameResetUpdate.type]: () => initialState,
});

export default game;
