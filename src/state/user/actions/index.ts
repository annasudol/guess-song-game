import { AppThunk } from '../../store';
import { USER } from '../constants';
import { UserTypes } from '../types';
import { createAction } from '@reduxjs/toolkit';
import { fetchUserDB } from '../../../utils';
import Cookies from 'js-cookie';

export const actionFetchUserSuccess = createAction(USER.FETCH, (user: UserTypes) => ({
  payload: user,
}));

export const actionLogoutUserSuccess = createAction(USER.LOGOUT);

export function fetchUserCookies(user: UserTypes): AppThunk {
  return (dispatch): void => {
    dispatch(actionFetchUserSuccess(user));
  };
}

export function fetchUser(accessToken: string): AppThunk {
  return async (dispatch): Promise<void> => {
    const request = fetch('https://api.spotify.com/v1/me', {
      headers: new Headers({
        Authorization: 'Bearer ' + accessToken,
      }),
    });

    try {
      const data = await (await request).json();

      if (data) {
        const user = {
          token: accessToken,
          userData: {
            image: data.images[0]?.url,
            name: data.display_name,
            userId: data.id,
          },
        };
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        dispatch(actionFetchUserSuccess(Cookies.getJSON('authenticatedUser') || user));
        fetchUserDB(data.display_name, data.id);
      }
    } catch (error) {
      console.warn('problem with login user', error);
    }
  };
}

export function logoutUser(): AppThunk {
  return (dispatch): void => {
    dispatch(actionLogoutUserSuccess());
    Cookies.remove('authenticatedUser');
  };
}
