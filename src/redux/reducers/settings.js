import { CHANGE_THEME, SETTINGS_END } from '../actions';

const INICIAL_STATE = {
  theme: 'white',
  categories: 0,
  type: '',
  dificult: '',
};

const settings = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_THEME: return { ...state,
    theme: action.payload,
  };
  case SETTINGS_END: return { ...state,
    categories: +action.payload.category,
    type: action.payload.type,
    dificult: action.payload.dificult,
  };
  default: return state;
  }
};

export default settings;
