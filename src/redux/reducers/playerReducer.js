const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

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
