import './PlaylistItem.css';
import { NavLink } from 'react-router-dom';
import React, { FunctionComponent, ReactElement } from 'react';
import { Image } from './../../components/';
import { PlayListTypes } from '../../state/playList/types/index';
import { shuffle } from '../../utils';

interface PlaylistItemProps {
  playlist: PlayListTypes;
}

export const PlaylistItem: FunctionComponent<PlaylistItemProps> = (playlist): ReactElement => {
  const id = Object.keys(playlist.playlist)[0];
  const playlistInfo = Object.values(playlist)[0][id];
  const image = playlistInfo['image'] ? playlistInfo['image'] : require('../../assets/images/png/noimage.png');
  const tracks = playlistInfo['tracks'];
  const songs = tracks && shuffle([...tracks]).slice(0, 10);

  return (
    <NavLink
      key={id}
      className="playlist_item w-5/12 md:w-1/5 m-1"
      to={{ pathname: `/game/${id}`, state: { songs, tracks } }}
    >
      <Image src={image} className="playlists-img" size="full" alt={playlistInfo['name']} />
    </NavLink>
  );
};
