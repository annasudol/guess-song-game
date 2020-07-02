import { actionClearSearch, searchPlaylistFailure, searchPlaylistSuccess } from '../actions';
import { createReducer } from '@reduxjs/toolkit';

const search = createReducer<string[]>([], {
  [searchPlaylistSuccess.type]: (state, action) => {
    if (searchPlaylistSuccess.match(action)) {
      return [...state, ...action.payload];
    }

    return state;
  },
  [searchPlaylistFailure.type]: state => ({
    ...state,
    isError: true,
  }),
  [actionClearSearch.type]: () => [],
});

export default search;
