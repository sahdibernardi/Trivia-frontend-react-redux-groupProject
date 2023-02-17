import { tokenApi } from '../../services/tokenApi';

export const TOKEN_API = 'tokenApi';
export const LOGIN_STATE = 'loginState';
export const CHANGE_TIME = 'CHANGE_TIME';
export const HAS_CLASS_ACTION = 'hasClassAction';
export const ADD_SCORE = 'addScore';
export const ADD_QUESTION_NUMBER = 'addQuestionNumber';
export const ADD_ASSERTIONS = 'addAssertions';
export const END_GAME = 'endGame';
export const CHANGE_THEME = 'changeTheme';
export const SETTINGS_END = 'settingsEnd';

export const loginState = (playload) => ({
  type: LOGIN_STATE,
  playload,
});

export const hasClassAction = (payload) => ({
  type: HAS_CLASS_ACTION,
  payload,
});

export const tokenApiAction = (playload) => ({
  type: TOKEN_API,
  playload,
});

export function fetchToken() {
  // não é necessario agora mas pode ser util no futuro
  return async (dispatch) => {
    const response = await tokenApi();
    dispatch(tokenApiAction(response));
  };
}

export const changeTime = (payload) => ({
  type: CHANGE_TIME,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const addQuestionNumber = (payload) => ({
  type: ADD_QUESTION_NUMBER,
  payload,
});

export const addAssertions = (payload) => ({
  type: ADD_ASSERTIONS,
  payload,
});

export const endGame = () => ({
  type: END_GAME,
});

export const changeTheme = (payload) => ({
  type: CHANGE_THEME,
  payload,
});

export const settingsEnd = (payload) => ({
  type: SETTINGS_END,
  payload,
});
