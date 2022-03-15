const INITIAL_STATE = true;

const isNextVisible = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'SET_BUTTON_VISIBILITY':
    return payload;
  default: return state;
  }
};

export default isNextVisible;
