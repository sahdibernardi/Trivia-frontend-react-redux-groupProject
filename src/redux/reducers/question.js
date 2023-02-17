import { ADD_QUESTION_NUMBER, END_GAME, HAS_CLASS_ACTION } from '../actions';

const INICIAL_STATE = {
  hasClass: false,
  questionNumber: 0,
};

const question = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case HAS_CLASS_ACTION:
    return { ...state,
      hasClass: action.payload,
    };
  case ADD_QUESTION_NUMBER:
    return { ...state,
      questionNumber: action.payload,
    };
  case END_GAME: return INICIAL_STATE;
  default: return state;
  }
};

export default question;
