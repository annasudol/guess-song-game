import { ErrorMessage, PlaylistItem, Search } from '../../components/';
import { PlayListTypes } from '../../state/playList/types';
import { clearPlaylist, fetchPlaylist } from '../../state/playList/actions';
import { getPlaylistData } from '../../state/playList/selectors';
import { getSearchPlaylistId } from '../../state/search/selectors';
import { getToken } from '../../state/user/selectors';
import { playListsIds } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { FunctionComponent, ReactElement, useEffect, useMemo } from 'react';

export const Playlists: FunctionComponent = (): ReactElement => {
  const token = useSelector(getToken);
  const playListData: PlayListTypes = useSelector(getPlaylistData);
  const searchPlaylistId: string[] = useSelector(getSearchPlaylistId);
  const dispatch = useDispatch();

  const playlistInfo = useMemo((): PlayListTypes[] => {
    return (
      playListData &&
      Object.keys(playListData).reduce((acc, id: string): [] | PlayListTypes[] => {
        if (id !== 'loading' && id !== 'isError') {
          const info = playListData[id];

          return [...acc, { [id]: info }];
        }

        return [...acc];
      }, [])
    );
  }, [playListData]);

  useEffect(() => {
    if (searchPlaylistId.length > 0) {
      dispatch(fetchPlaylist(token, searchPlaylistId));
    } else {
      dispatch(clearPlaylist());
      dispatch(fetchPlaylist(token, playListsIds));
    }
  }, [dispatch, searchPlaylistId]);

  const results = (
    <div className="flex w-full justify-between flex-wrap h-auto mt-2 mb-6">
      {playlistInfo?.map(
        (playlist: PlayListTypes): ReactElement => (
          <PlaylistItem playlist={playlist} key={Object.keys(playlist)[0]} />
        ),
      )}
    </div>
  );

  return (
    <div className="container overflow-x-hidden">
      <Search />
      {playListData?.loading ? (
        <div className="container flex justify-center items-center overflow-hidden w-full mt-20">
          <CircularProgress size={100} color="primary" />
        </div>
      ) : playListData?.isError ? (
        <ErrorMessage message="ups..., Error, something went wrong" />
      ) : (
        results
      )}
    </div>
  );
};
