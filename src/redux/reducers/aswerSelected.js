const INITIAL_STATE = {};

const answerSelected = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'ADD_ANSWER_SELECTED':
    return payload;
  default: return state;
  }
};

export default answerSelected;