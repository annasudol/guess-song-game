import { AppThunk } from '../../store';
import { SEARCH } from '../constants';
import { createAction } from '@reduxjs/toolkit';

export const searchPlaylistSuccess = createAction(SEARCH.success, (data: string[]) => ({
  payload: data,
}));

export const searchPlaylistFailure = createAction(SEARCH.failure);

export const actionClearSearch = createAction(SEARCH.clear);

export function searchPlayList(accessToken: string, query: string): AppThunk {
  return (dispatch): void => {
    const request = new Request(`https://api.spotify.com/v1/search?q=${query}&type=playlist`, {
      headers: new Headers({
        Authorization: 'Bearer ' + accessToken,
      }),
    });

    fetch(request)
      .then(res => res.json())
      .then(res => {
        const ids = res['playlists'].items.map((item: { id: string }) => item.id);

        dispatch(searchPlaylistSuccess(ids));
      })
      .catch((): void => {
        dispatch(searchPlaylistFailure());
      });
  };
}

export function clearSearch(): AppThunk {
  return (dispatch): { payload: undefined; type: string } => dispatch(actionClearSearch());
}
