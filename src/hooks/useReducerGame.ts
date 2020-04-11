import { Dispatch, useReducer } from 'react';

type StateType = {
  songIndex: number;
  end: boolean;
  totalScore: number;
};

type Action = { TYPE: 'INCREASE_INDEX' } | { TYPE: 'END_GAME' } | { TYPE: 'CHANGE_POINTS'; setPoints: number };

export const initialState = { end: false, totalScore: 0, songIndex: 0 };

function reducer(state: StateType, action: Action): StateType {
  switch (action.TYPE) {
    case 'INCREASE_INDEX':
      return { ...state, songIndex: state.songIndex + 1 };
    case 'END_GAME':
      return { ...state, end: true };
    case 'CHANGE_POINTS':
      return { ...state, totalScore: state.totalScore + action.setPoints };
  }
}

export function useReducerGame(): {
  dispatch: Dispatch<Action>;
  end: boolean;
  totalScore: number;
  songIndex: number;
} {
  const [{ songIndex, end, totalScore }, dispatch] = useReducer(reducer, initialState);

  return { dispatch, end, totalScore, songIndex };
}
