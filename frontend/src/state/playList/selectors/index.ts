import { AppState } from '../../store';
import { PlayListTypes } from '../types';

export function getPlaylistData(state: AppState): PlayListTypes | {} {
  return state.playlist;
}
