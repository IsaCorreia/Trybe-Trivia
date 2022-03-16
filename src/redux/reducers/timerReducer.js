const INITIAL_STATE = 0;

const timerInfo = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'SAVE_TIME':
    return payload;
  default: return state;
  }
};

export default timerInfo;
