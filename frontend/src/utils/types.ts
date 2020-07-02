import { TrackType } from '../../src/state/playList/types';

export interface LocationTypes {
  hash?: string;
  pathname: string;
  search?: string;
  state: {
    songs: TrackType[];
    tracks: TrackType[];
    points?: number;
  };
  key?: string;
}
