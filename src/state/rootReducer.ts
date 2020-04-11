import { combineReducers } from '@reduxjs/toolkit';

import playlist from './playList/reducer';
import search from './search/reducer';
import user from './user/reducer';
import game from './game/reducer';

export const rootReducer = combineReducers({ playlist, search, user, game });

export type RootState = ReturnType<typeof rootReducer>;
