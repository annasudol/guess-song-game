import React, * as react from 'react';
import { TrackType } from '../../state/playList/types/';
import { Button } from '../../components';

interface SongProp {
  song: TrackType;
}

export const Song: react.FunctionComponent<SongProp> = ({ song }): react.ReactElement => (
  <li className="flex flex justify-start full-width mb-1 rounded-sm">
    <div className="w-3/5">
      <h3 className="font-openSans text-sm text-white">{song.title}</h3>
    </div>
    <div className="w-1/5">
      <h3 className="font-openSans text-sm text-white">{song.artist}</h3>
    </div>
    <div className="w-1/5">
      <Button href={{ path: song.externalUrl, target: true }}>
        <i className="fas fa-play-circle" aria-hidden="true" />
      </Button>
    </div>
  </li>
);
