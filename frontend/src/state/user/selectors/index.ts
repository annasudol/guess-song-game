import { AppState } from '../../store';
import { UserInfoTypes } from '../types';

export function getToken(state: AppState): string {
  return state.user.token;
}

export function getUserInfo(state: AppState): UserInfoTypes {
  return state.user.userData;
}
