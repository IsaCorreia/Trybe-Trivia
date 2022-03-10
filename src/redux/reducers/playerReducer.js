const INITIAL_STATE = {};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'SAVE_USER_INFO':
    return {
      ...state,
      ...payload,
    };

  default: return state;
  }
};

export default player;
