import { PlayListTypes } from '../types';
import {
  actionClearPlaylist,
  actionFetchPlaylistFailure,
  actionFetchPlaylistSuccess,
  actionFetchPlaylistWaiting,
} from '../actions';
import { createReducer } from '@reduxjs/toolkit';

const playlist = createReducer<PlayListTypes | {}>(
  {},
  {
    [actionFetchPlaylistWaiting.type]: () => ({
      isError: false,
      loading: true,
    }),
    [actionFetchPlaylistSuccess.type]: (state, action) => {
      if (actionFetchPlaylistSuccess.match(action)) {
        return {
          ...state,
          isError: false,
          loading: false,
          ...action.payload,
        };
      }

      return state;
    },
    [actionFetchPlaylistFailure.type]: () => ({
      isError: true,
      loading: false,
    }),
    [actionClearPlaylist.type]: () => ({}),
  },
);

export default playlist;
