import { ADD_ASSERTIONS,
  ADD_SCORE, END_GAME, LOGIN_STATE } from '../actions';

const INICIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_STATE: return { ...state,
    name: action.playload.name,
    gravatarEmail: action.playload.email,
  };
  case ADD_SCORE: return { ...state,
    score: state.score + action.payload,
  };
  case ADD_ASSERTIONS: return { ...state,
    assertions: action.payload,
  };
  case END_GAME: return { ...INICIAL_STATE,
    theme: state.theme,
  };
  default: return state;
  }
};

export default player;
