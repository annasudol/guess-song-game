import { AppThunk } from '../../store';
import { PLAYLIST } from '../constants';
import { PlayListTypes } from '../types';
import { TrackType } from './../types';
import { createAction } from '@reduxjs/toolkit';

export const actionFetchPlaylistWaiting = createAction(PLAYLIST.FETCH.request);
export const actionFetchPlaylistSuccess = createAction(PLAYLIST.FETCH.success, (data: PlayListTypes) => ({
  payload: data,
}));

export const actionFetchPlaylistFailure = createAction(PLAYLIST.FETCH.failure);
export const actionClearPlaylist = createAction(PLAYLIST.CLEAR);

export function fetchPlaylist(accessToken: string, playlistID: string[]): AppThunk {
  return (dispatch): unknown => {
    dispatch(actionFetchPlaylistWaiting());

    return playlistID.map((id: string): TrackType[] | void => {
      const request = new Request(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
      });

      fetch(request)
        .then(res => res.json())
        .then(res => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const tracks = res.tracks.items.reduce((acc: TrackType[], item: any): TrackType[] => {
            if (item?.track.preview_url) {
              const img = item.track.album.images[2].url;
              const artist = item.track.artists.map((artist: { name: string }) => artist.name).join(', ');

              const externalUrl = item.track.external_urls.spotify;
              const title = item.track.name;
              const track = {
                artist,
                externalUrl,
                img,
                songUrl: item.track.preview_url,
                title,
              };

              return [...acc, track];
            }

            return acc;
          }, []);

          if (tracks.length > 30) {
            dispatch(
              actionFetchPlaylistSuccess({
                [res.id]: {
                  image: res.images[0].url,
                  name: res.name,
                  tracks,
                },
              }),
            );
          }
        })
        .catch(err => {
          console.warn(`Problem with fetching playlist`, err);
        });
    });
  };
}

export function clearPlaylist(): AppThunk {
  return (dispatch): { payload: undefined; type: string } => dispatch(actionClearPlaylist());
}
