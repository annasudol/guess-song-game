import { AppState } from '../../store';

export function getSearchPlaylistId(state: AppState): string[] | [] {
  return state.search;
}
