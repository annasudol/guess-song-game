import { AppState } from '../../store';
import { TrackType } from '../../playList/types';

export function getGameTracks(state: AppState): TrackType[] {
  return state.game.tracks;
}

export function getGamePoints(state: AppState): number {
  return state.game.score;
}

export function getPlaylistId(state: AppState): string {
  return state.game.playlistId;
}
