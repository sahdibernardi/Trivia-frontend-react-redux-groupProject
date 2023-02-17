import { CHANGE_TIME } from '../actions';

const INICIAL_STATE = {
  time: 30,
};

const timer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_TIME: return {
    ...state,
    time: action.payload,
  };
  default: return state;
  }
};

export default timer;
