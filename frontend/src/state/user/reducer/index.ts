import { UserTypes } from '../types';
import { createReducer } from '@reduxjs/toolkit';
import { actionFetchUserSuccess, actionLogoutUserSuccess } from '../actions';

export const initialState = { token: '', userData: { image: '', name: '', userId: '' } };

export const user = createReducer<UserTypes>(initialState, {
  [actionFetchUserSuccess.type]: (state, action) => {
    if (actionFetchUserSuccess.match(action)) {
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload.userData,
      };
    }
    return state;
  },
  [actionLogoutUserSuccess.type]: () => initialState,
});

export default user;
